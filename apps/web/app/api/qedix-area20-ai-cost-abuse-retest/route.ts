import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AiRequest = {
  prompt?: string;
  model?: string;
  maxTokens?: number;
};

export async function POST(req: Request) {
  const body = (await req.json()) as AiRequest;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: "Bearer " + (process.env.OPENAI_API_KEY ?? ""),
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: body.model ?? "gpt-4o",
      messages: [{ role: "user", content: body.prompt ?? "" }],
      max_tokens: body.maxTokens ?? 4000,
    }),
  });

  const result = await response.json();

  return NextResponse.json({ ok: true, result });
}
