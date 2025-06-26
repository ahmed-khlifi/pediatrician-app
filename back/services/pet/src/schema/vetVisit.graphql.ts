import { gql } from "apollo-server-express";

export const VetVisitTypeDefs = gql`
type VisitVeterinaire {
  id: ID!
  date: String!
  description: String!
  pet: Pet!
}

extend type Query {
  visitVeterinaire(id: ID!): VisitVeterinaire
  visitVeterinaireList: [VisitVeterinaire!]!
  visitsByPet(petId: ID!): [VisitVeterinaire!]!
}

extend type Mutation {
  createVisitVeterinaire(
    date: String!
    description: String!
    petId: ID!
  ): VisitVeterinaire!

  updateVisitVeterinaire(
    id: ID!
    date: String
    description: String
    petId: ID
  ): VisitVeterinaire!

  deleteVisitVeterinaire(id: ID!): VisitVeterinaire
}
`