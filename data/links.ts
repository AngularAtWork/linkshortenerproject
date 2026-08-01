import { db, schema } from "@/db";
import { and, desc, eq, ne } from "drizzle-orm";

/**
 * Fetch all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links belonging to the user, ordered by most recently updated first
 */
export async function getUserLinks(userId: string) {
  const userLinks = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.userId, userId))
    .orderBy(desc(schema.links.updatedAt));

  return userLinks;
}

/**
 * Insert a new link into the database
 * @param data - Link data including url, shortCode, and userId
 * @returns The newly created link
 */
export async function insertLink(data: {
  url: string;
  shortCode: string;
  userId: string;
}) {
  const [newLink] = await db
    .insert(schema.links)
    .values({
      url: data.url,
      shortCode: data.shortCode,
      userId: data.userId,
    })
    .returning();

  return newLink;
}

/**
 * Update an existing link
 * @param id - The link ID
 * @param data - Updated link data
 * @param userId - The user ID (for authorization)
 * @returns The updated link or null if not found/unauthorized
 */
export async function updateLink(
  id: number,
  data: { url?: string; shortCode?: string },
  userId: string,
) {
  const [updatedLink] = await db
    .update(schema.links)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.links.id, id))
    .returning();

  // Verify ownership
  if (updatedLink && updatedLink.userId !== userId) {
    return null;
  }

  return updatedLink;
}

/**
 * Delete a link
 * @param id - The link ID to delete
 * @param userId - The user ID (for authorization)
 * @returns True if deleted, false if not found/unauthorized
 */
export async function deleteLink(id: number, userId: string): Promise<boolean> {
  const [deletedLink] = await db
    .delete(schema.links)
    .where(eq(schema.links.id, id))
    .returning();

  // Verify ownership
  if (!deletedLink || deletedLink.userId !== userId) {
    return false;
  }

  return true;
}

/**
 * Check if a short code already exists
 * @param shortCode - The short code to check
 * @returns True if the short code exists, false otherwise
 */
export async function shortCodeExists(shortCode: string): Promise<boolean> {
  const [existing] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortCode, shortCode))
    .limit(1);

  return !!existing;
}

/**
 * Check if a short code already exists, excluding a specific link ID
 * @param shortCode - The short code to check
 * @param excludeId - The link ID to exclude from the check
 * @returns True if the short code exists for a different link, false otherwise
 */
export async function shortCodeExistsExcluding(
  shortCode: string,
  excludeId: number,
): Promise<boolean> {
  const [existing] = await db
    .select()
    .from(schema.links)
    .where(
      and(
        eq(schema.links.shortCode, shortCode),
        ne(schema.links.id, excludeId),
      ),
    )
    .limit(1);

  return !!existing;
}

/**
 * Get a link by its short code
 * @param shortCode - The short code to look up
 * @returns The link if found, null otherwise
 */
export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortCode, shortCode))
    .limit(1);

  return link || null;
}
