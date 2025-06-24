import { gql } from 'apollo-server-express';

export const typeDefs = gql`
extend type Query {
    owner(id: ID!): Owner
    owners: [Owner!]!
}

type Owner @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
}

type Mutation {
    createOwner(name: String!, email: String!): Owner!
}
`;