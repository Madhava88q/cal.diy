async function rebuildAccountIndex(accountId: string) {
  if (!accountId) {
    throw new Error("missing account id");
  }

  await refreshSearchIndex(accountId);
  await refreshCache(accountId);

  return { indexed: true };
}

async function refreshSearchIndex(_accountId: string) {
  return { ok: true };
}

async function refreshCache(_accountId: string) {
  return { ok: true };
}

export async function POST(request: Request) {
  const body = await request.json();

  await rebuildAccountIndex(body.accountId);

  return Response.json({
    ok: true,
  });
}
