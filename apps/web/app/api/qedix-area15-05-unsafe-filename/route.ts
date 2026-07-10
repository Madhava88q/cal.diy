import path from "node:path";
import { writeFile } from "node:fs/promises";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = String(formData.get("filename"));
  const filePath = path.join("/var/app/uploads", filename);

  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return Response.json({ ok: true, filePath });
}
