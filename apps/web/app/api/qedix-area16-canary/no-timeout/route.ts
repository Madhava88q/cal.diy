export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(String(body.scrapeUrl));
  const text = await response.text();

  return Response.json({
    ok: true,
    text: text.slice(0, 200),
  });
}
