export default function QedixArea23SensitiveFieldsPage() {
  const user = {
    email: "user@example.com",
    phone: "+10000000000",
    accessToken: "access_token_123",
    passwordHash: "hash_123",
    internalNotes: "support-only account note",
    riskScore: 98,
  };

  return (
    <main>
      <h1>Account Debug</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Access token: {user.accessToken}</p>
      <p>Password hash: {user.passwordHash}</p>
      <p>Internal notes: {user.internalNotes}</p>
      <p>Risk score: {user.riskScore}</p>
    </main>
  );
}
