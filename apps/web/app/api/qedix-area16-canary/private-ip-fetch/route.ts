export async function GET() {
  const response = await fetch("http://127.0.0.1:8080/admin/status");
  const text = await response.text();

  return Response.json({
    ok: true,
    text: text.slice(0, 200),
  });
}
