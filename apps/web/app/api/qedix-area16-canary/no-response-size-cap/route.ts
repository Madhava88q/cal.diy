export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(String(body.remoteJsonUrl), {
    signal: AbortSignal.timeout(5000),
  });

  const payload = await response.text();

  return Response.json({
    ok: true,
    payload,
  });
}
