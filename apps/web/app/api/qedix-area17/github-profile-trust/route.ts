export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(`https://api.github.com/users/${body.login}`);
  const profile = await response.json();

  await saveGitHubProfile({
    id: profile.id,
    login: profile.login,
    plan: profile.plan.name,
  });

  return Response.json({ ok: true });
}

async function saveGitHubProfile(input: { id: string; login: string; plan: string }) {
  return input;
}
