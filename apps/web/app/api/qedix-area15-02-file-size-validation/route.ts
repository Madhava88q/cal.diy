const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  await s3.putObject({
    Bucket: "avatars",
    Key: "avatar-upload",
    Body: avatar,
  });

  return Response.json({ uploaded: true });
}
