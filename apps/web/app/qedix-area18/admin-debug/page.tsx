"use client";

export default function QedixArea18AdminDebugPage() {
  const databaseUrl = process.env.DATABASE_URL;
  const githubToken = process.env.GITHUB_TOKEN;

  return (
    <main>
      <h1>Area 18 private env exposure canary</h1>
      <p>Database URL configured: {databaseUrl ? "yes" : "no"}</p>
      <p>GitHub token configured: {githubToken ? "yes" : "no"}</p>
    </main>
  );
}
