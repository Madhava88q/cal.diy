export const qedixArea12GraphqlSchema = /* GraphQL */ `
  type QedixArea12Profile {
    id: ID!
    email: String!
    displayName: String!

    # Qedix Area 12.9 controlled canary:
    # This intentionally changes a GraphQL public schema contract.
    # Existing clients may not expect these newly required fields.
    locale: String!
    timezone: String!
  }

  type Query {
    qedixArea12Profile(id: ID!): QedixArea12Profile!
  }
`;

export const qedixArea12GraphqlContractVersion = "area-12-graphql-schema-canary";
