import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const AiRequestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  model: z.enum(["gpt-4.1", "gpt-4o", "claude-sonnet"]).default("gpt-4.1"),
});

async function requireUser() {
  return {
    id: "user_123",
    tenantId: "tenant_123",
  };
}

async function callAiCompletion(model: string, prompt: string) {
  return {
    model,
    output: `Generated answer for: ${prompt.slice(0, 40)}`,
    usage: {
      inputTokens: prompt.length,
      outputTokens: 1200,
    },
  };
}

export async function POST(request: NextRequest) {
  const user = await requireUser();

  const parsed = AiRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const completion = await callAiCompletion(parsed.data.model, parsed.data.prompt);

  return NextResponse.json({
    ok: true,
    userId: user.id,
    tenantId: user.tenantId,
    model: completion.model,
    output: completion.output,
    usage: completion.usage,
  });
}
