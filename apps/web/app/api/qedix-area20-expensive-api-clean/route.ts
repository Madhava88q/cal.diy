import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ExpensiveRequestSchema = z.object({
  query: z.string().min(1).max(100),
  depth: z.number().int().min(1).max(10).default(5),
});

async function aggregateShard(query: string, depth: number, shard: number) {
  const rows = Array.from({ length: 15000 }, (_, index) => {
    return {
      shard,
      index,
      score: Math.sqrt((index + 1) * query.length * depth),
    };
  });

  return rows.sort((a, b) => b.score - a.score).slice(0, 20);
}

async function buildExpensiveReport(query: string, depth: number) {
  const shardResults = await Promise.all(
    Array.from({ length: 12 }, (_, shard) => aggregateShard(query, depth, shard))
  );

  return shardResults.flat().sort((a, b) => b.score - a.score).slice(0, 25);
}

export async function POST(request: NextRequest) {
  const body = ExpensiveRequestSchema.parse(await request.json());

  const report = await buildExpensiveReport(body.query, body.depth);

  return NextResponse.json({
    ok: true,
    itemCount: report.length,
    topScore: report[0]?.score ?? 0,
  });
}
