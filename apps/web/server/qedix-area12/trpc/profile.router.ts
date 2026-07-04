const z = {
  object: (shape: unknown) => ({ shape }),
  string: () => ({ type: "string" }),
  boolean: () => ({ type: "boolean" }),
};

const publicProcedure = {
  input: (_schema: unknown) => ({
    query: (_handler: unknown) => ({
      kind: "query",
    }),
  }),
};

const router = (procedures: unknown) => procedures;

// Qedix Area 12.10 controlled canary:
// This intentionally represents a tRPC public procedure contract change.
// Existing clients may expect profile.getPublicProfile to accept only { id }.
// This procedure now requires includePreferences and displayMode.
export const qedixArea12ProfileRouter = router({
  getPublicProfile: publicProcedure
    .input(
      z.object({
        id: z.string(),
        includePreferences: z.boolean(),
        displayMode: z.string(),
      }),
    )
    .query(() => {
      return {
        id: "profile_area12_010",
        displayName: "Area 12 tRPC Canary",
        displayMode: "expanded",
        contractVersion: "area-12-trpc-procedure-canary",
      };
    }),
});
