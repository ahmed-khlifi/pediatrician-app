import { gql } from "apollo-server-express";

export const UserAppTypeDefs = gql`
  # External type for VisitVeterinaire (to support @key federation if needed)
  extend type VisitVeterinaire @key(fields: "id") {
    id: ID! @external
  }

  enum Role {
    OWNER
    VETERINAIRE
  }

  type UserApp {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    visits: [VisitVeterinaire!]!
  }

  # Payload returned on login/register (includes JWT token)
  type AuthPayload {
    token: String!
    user: UserApp!
  }

  extend type Query {
    user(id: ID!): UserApp
    userList: [UserApp!]!
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: Role!
    ): UserApp!

    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      role: Role
    ): UserApp!

    deleteUser(id: ID!): UserApp

    login(email: String!, password: String!): AuthPayload!
    register(
      name: String!
      email: String!
      password: String!
      role: Role!
    ): AuthPayload!
  }
`;
