const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const key = String(formData.get("projectFileKey"));

  await s3.putObject({
    Bucket: "tenant-files",
    Key: key,
    Body: file,
  });

  return Response.json({ ok: true, key });
}
