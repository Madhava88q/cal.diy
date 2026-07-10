const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  await s3.putObject({
    Bucket: "uploads",
    Key: file.name,
    Body: file,
    ContentType: file.type,
  });

  return Response.json({ ok: true, type: file.type });
}
