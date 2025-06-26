import { gql } from "apollo-server-express";

export const PetTypeDefs = gql`
  type Pet {
  id: ID!
  name: String!
  type: String!
  race: String!
  age: Int!
  petImage: String!
  visits: [VisitVeterinaire!]!
}

extend type Query {
  pet(id: ID!): Pet
  petList: [Pet!]!
}

extend type Mutation {
  createPet(
    name: String!
    type: String!
    race: String!
    age: Int!
    petImage: String!
  ): Pet!

  updatePet(
    id: ID!
    name: String
    type: String
    race: String
    age: Int
    petImage: String
  ): Pet!

  deletePet(id: ID!): Pet
}
`