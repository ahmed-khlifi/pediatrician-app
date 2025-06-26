import { gql } from "apollo-server-express";

export const UserAppTypeDefs = gql`
  type UserApp {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    visits: [VisitVeterinaire!]!
  }

  enum Role {
    OWNER
    VETERINAIRE
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
    login(email: String!, password: String!): AuthPayload
    register(
      name: String!
      email: String!
      password: String!
      role: Role!
    ): AuthPayload!
  }
  type AuthPayload {
    token: String!
    user: UserApp!
  }
`;
