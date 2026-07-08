import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ExportRequestSchema = z.object({
  query: z.string().min(1).max(100),
  format: z.enum(["json", "csv"]).default("json"),
});

async function searchRecords(query: string) {
  return Array.from({ length: 2500 }, (_, index) => {
    return {
      recordId: `record_${index}`,
      matched: query,
      createdAt: new Date().toISOString(),
    };
  });
}

function toCsv(records: Array<{ recordId: string; matched: string; createdAt: string }>) {
  return [
    "recordId,matched,createdAt",
    ...records.map((record) => `${record.recordId},${record.matched},${record.createdAt}`),
  ].join("\n");
}

export async function POST(request: NextRequest) {
  const parsed = ExportRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const records = await searchRecords(parsed.data.query);

  if (parsed.data.format === "csv") {
    return new NextResponse(toCsv(records), {
      status: 200,
      headers: {
        "content-type": "text/csv",
      },
    });
  }

  return NextResponse.json({
    ok: true,
    count: records.length,
    records,
  });
}
