export async function POST(req: Request) {
  const body = await req.json();

  const targetUrl = String(body.url);

  const response = await fetch(targetUrl);
  const preview = await response.text();

  return Response.json({
    ok: true,
    preview: preview.slice(0, 200),
  });
}
