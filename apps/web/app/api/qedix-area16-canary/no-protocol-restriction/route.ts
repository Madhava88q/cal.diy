export async function POST(req: Request) {
  const body = await req.json();

  const target = new URL(String(body.previewUrl));

  if (!["example.com", "cdn.example.com"].includes(target.hostname)) {
    return Response.json({ error: "host not allowed" }, { status: 400 });
  }

  const response = await fetch(target.toString(), {
    signal: AbortSignal.timeout(5000),
  });

  const contentLength = response.headers.get("content-length");
  if (contentLength && Number(contentLength) > 1000000) {
    return Response.json({ error: "response too large" }, { status: 413 });
  }

  const preview = (await response.text()).slice(0, 200);

  return Response.json({
    ok: true,
    preview,
  });
}
