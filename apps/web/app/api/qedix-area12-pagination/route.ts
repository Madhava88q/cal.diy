import { NextResponse } from "next/server";

const items = [
  { id: "item_001", title: "First item" },
  { id: "item_002", title: "Second item" },
];

export async function GET() {
  // Qedix Area 12.6 controlled canary:
  // This intentionally represents a pagination contract change.
  // Existing clients may expect offset pagination fields:
  // { items, page, pageSize, total }
  //
  // This route now returns cursor pagination fields:
  // { data, nextCursor, hasMore }
  return NextResponse.json({
    data: items,
    nextCursor: "cursor_area12_next",
    hasMore: true,
    contractVersion: "area-12-pagination-canary",
  });
}
