import { getLinkByShortCode } from "@/data/links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  // Look up the link by short code
  const link = await getLinkByShortCode(shortcode);

  // If link not found, return 404
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  // Redirect to the full URL
  return NextResponse.redirect(link.url, 301);
}
