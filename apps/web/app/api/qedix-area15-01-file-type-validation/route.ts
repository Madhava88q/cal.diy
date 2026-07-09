const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  await s3.putObject({
    Bucket: "uploads",
    Key: "raw-upload",
    Body: file,
  });

  return Response.json({ ok: true });
}
