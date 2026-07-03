export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(String(body.previewUrl), {
    redirect: "follow",
  });

  const html = await response.text();

  return Response.json({
    ok: true,
    html: html.slice(0, 200),
  });
}
