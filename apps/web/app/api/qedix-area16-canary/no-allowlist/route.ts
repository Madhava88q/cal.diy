export async function POST(req: Request) {
  const body = await req.json();

  const url = String(body.url);

  const response = await fetch(url);
  const text = await response.text();

  return Response.json({
    ok: true,
    text: text.slice(0, 200),
  });
}
