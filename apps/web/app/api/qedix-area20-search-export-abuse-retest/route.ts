import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") ?? "";
  const format = url.searchParams.get("format") ?? "json";
  const limit = Number(url.searchParams.get("limit") ?? "5000");

  const rows = await searchCustomers(query, limit);

  if (format === "csv") {
    const csv = rows.map((row) => row.id + "," + row.email + "," + row.phone).join("\n");
    return new Response(csv, {
      headers: {
        "content-type": "text/csv",
        "content-disposition": "attachment; filename=customers.csv",
      },
    });
  }

  return NextResponse.json({ query, rows });
}

async function searchCustomers(query: string, limit: number) {
  return Array.from({ length: Math.min(limit, 5000) }, (_, index) => ({
    id: "customer_" + index,
    email: (query || "user") + index + "@example.com",
    phone: "+1555000" + index,
  }));
}
