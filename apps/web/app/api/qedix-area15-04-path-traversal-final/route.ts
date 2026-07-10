import path from "node:path";
import { readFile } from "node:fs/promises";

export async function POST(request: Request) {
  const body = await request.json();

  const filePath = path.join("/var/app/uploads", body.filename);
  const file = await readFile(filePath);

  return new Response(file);
}
