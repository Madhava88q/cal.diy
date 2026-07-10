import sharp from "sharp";

const s3 = { putObject: async (_input: unknown) => ({}) };

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image") as File;

  const resized = await sharp(Buffer.from(await file.arrayBuffer()))
    .resize(400, 400)
    .toBuffer();

  await s3.putObject({
    Bucket: "images",
    Key: file.name,
    Body: resized,
  });

  return Response.json({ ok: true });
}
