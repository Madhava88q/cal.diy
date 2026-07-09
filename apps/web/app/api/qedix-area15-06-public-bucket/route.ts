const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const key = String(formData.get("filename"));

  await s3.putObject({
    Bucket: "public-uploads",
    Key: key,
    Body: file,
    ACL: "public-read",
  });

  const publicUrl = `https://cdn.example.com/${key}`;

  return Response.json({ ok: true, publicUrl });
}
