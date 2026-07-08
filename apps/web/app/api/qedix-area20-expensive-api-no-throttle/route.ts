import { NextRequest, NextResponse } from "next/server";

async function runExpensiveComputation(input: string) {
  const items = Array.from({ length: 5000 }, (_, index) => {
    return {
      index,
      score: Math.sqrt(index * input.length),
    };
  });

  return items.sort((a, b) => b.score - a.score).slice(0, 25);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await runExpensiveComputation(String(body.query ?? ""));

  return NextResponse.json({
    ok: true,
    result,
  });
}
