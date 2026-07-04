export const qedixArea12GraphqlRetestSchema = `
  type Query {
    publicProfile(
      id: ID!
      locale: String!
      timezone: String!
    ): PublicProfile!
  }

  type PublicProfile {
    id: ID!
    displayName: String!
    locale: String!
    timezone: String!
  }

  input PublicProfileLookupInput {
    id: ID!
    locale: String!
    timezone: String!
  }
`;
