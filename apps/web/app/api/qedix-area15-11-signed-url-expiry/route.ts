const s3 = { getObject: async (_input: unknown) => ({}) };

async function getSignedUrl(_client: unknown, _command: unknown, _options: unknown) {
  return "https://cdn.example.com/download";
}

export async function POST(request: Request) {
  const body = await request.json();

  await s3.getObject({
    Bucket: "files",
    Key: body.key,
  });

  const signedUrl = await getSignedUrl(s3, { Key: body.key }, { expiresIn: 31536000 });

  return Response.json({ ok: true, signedUrl, expiresIn: 31536000 });
}
