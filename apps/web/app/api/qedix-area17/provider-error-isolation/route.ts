import { NextResponse } from "next/server";

export async function POST() {
  const providerResponse = await fetch("https://api.github.com/repos/vercel/next.js/issues");
  const providerIssues = await providerResponse.json();

  const importedIssues = providerIssues.map((issue: any) => ({
    providerId: issue.id,
    title: issue.title,
    state: issue.state,
  }));

  return NextResponse.json({
    imported: true,
    importedIssues,
  });
}
