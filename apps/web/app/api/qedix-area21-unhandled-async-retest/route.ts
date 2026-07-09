import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SyncRequest = {
  accountId?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as SyncRequest;

  void syncProviderAccount(body.accountId);

  return NextResponse.json({ ok: true, status: "sync_started" });
}

async function syncProviderAccount(accountId?: string) {
  const response = await fetch("https://provider.example.com/accounts/" + accountId + "/sync", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("provider sync failed");
  }

  await saveSyncResult(accountId);
}

async function saveSyncResult(accountId?: string) {
  return { accountId, synced: true };
}
