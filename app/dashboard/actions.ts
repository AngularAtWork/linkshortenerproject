"use server";

import {
  deleteLink as deleteFromDb,
  insertLink,
  shortCodeExists,
  shortCodeExistsExcluding,
  updateLink as updateInDb,
} from "@/data/links";
import type { Link } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

type CreateLinkInput = {
  url: string;
  shortCode?: string;
};

type ActionResponse<T = void> = { success: true; data: T } | { error: string };

const linkSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Must be a valid URL")
    .max(2048, "URL is too long"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    )
    .optional(),
});

/**
 * Generate a random short code
 * @param length - Length of the short code (default: 6)
 * @returns A random alphanumeric string
 */
function generateShortCode(length = 6): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a new shortened link
 * @param data - Link data including url and optional shortCode
 * @returns ActionResponse with the created link or error message
 */
export async function createLink(
  data: CreateLinkInput,
): Promise<ActionResponse<Link>> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Validate input
    const validated = linkSchema.parse(data);

    // Generate short code if not provided
    let shortCode = validated.shortCode;
    if (!shortCode) {
      // Try up to 5 times to generate a unique code
      let attempts = 0;
      do {
        shortCode = generateShortCode();
        attempts++;
      } while ((await shortCodeExists(shortCode)) && attempts < 5);

      // If still not unique, try with longer code
      if (await shortCodeExists(shortCode)) {
        shortCode = generateShortCode(8);
        if (await shortCodeExists(shortCode)) {
          return {
            error: "Failed to generate unique short code. Please try again.",
          };
        }
      }
    } else {
      // Check if custom short code already exists
      if (await shortCodeExists(shortCode)) {
        return {
          error: "This short code is already taken. Please choose another.",
        };
      }
    }

    // Insert the link
    const newLink = await insertLink({
      url: validated.url,
      shortCode,
      userId,
    });

    return { success: true, data: newLink };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error("Error creating link:", error);
    return { error: "Failed to create link. Please try again." };
  }
}

type EditLinkInput = {
  id: number;
  url: string;
  shortCode: string;
};

/**
 * Edit an existing shortened link
 * @param data - Link data including id, url, and shortCode
 * @returns ActionResponse with the updated link or error message
 */
export async function editLink(
  data: EditLinkInput,
): Promise<ActionResponse<Link>> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Validate input (shortCode is required for edit)
    const editSchema = z.object({
      id: z.number(),
      url: z
        .string()
        .min(1, "URL is required")
        .url("Must be a valid URL")
        .max(2048, "URL is too long"),
      shortCode: z
        .string()
        .min(3, "Short code must be at least 3 characters")
        .max(20, "Short code must be at most 20 characters")
        .regex(
          /^[a-zA-Z0-9_-]+$/,
          "Short code can only contain letters, numbers, hyphens, and underscores",
        ),
    });

    const validated = editSchema.parse(data);

    // Check if short code is taken by another link
    if (await shortCodeExistsExcluding(validated.shortCode, validated.id)) {
      return {
        error: "This short code is already taken. Please choose another.",
      };
    }

    // Update the link
    const updatedLink = await updateInDb(
      validated.id,
      {
        url: validated.url,
        shortCode: validated.shortCode,
      },
      userId,
    );

    if (!updatedLink) {
      return { error: "Link not found or unauthorized" };
    }

    return { success: true, data: updatedLink };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    console.error("Error editing link:", error);
    return { error: "Failed to edit link. Please try again." };
  }
}

/**
 * Delete a shortened link
 * @param id - The ID of the link to delete
 * @returns ActionResponse indicating success or error
 */
export async function deleteLink(id: number): Promise<ActionResponse<void>> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // Delete the link
    const deleted = await deleteFromDb(id, userId);

    if (!deleted) {
      return { error: "Link not found or unauthorized" };
    }

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { error: "Failed to delete link. Please try again." };
  }
}
