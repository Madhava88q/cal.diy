const openai = {
  responses: {
    create: async (_input: unknown) => ({ output_text: "draft" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const result = await openai.responses.create({
    model: "gpt-4.1",
    input: body.prompt,
  });

  return Response.json({
    text: result.output_text,
  });
}
