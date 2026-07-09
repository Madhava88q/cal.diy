export async function POST(request: Request) {
  const body = await request.json();

  const providerResponse = await fetch("https://provider.example/sync", {
    method: "POST",
    body: JSON.stringify({ accountId: body.accountId }),
  });

  const result = await providerResponse.json();

  return Response.json({
    ok: true,
    providerId: result.id,
  });
}
