import { gql } from "apollo-server-express";

export const PriseTypeDefs = gql`
  extend type VisitVeterinaire @key(fields: "id") {
    id: ID! @external
  }

  type Prise {
    id: ID!
    date: String!
    notes: String
    visit: VisitVeterinaire! @external
    vaccine: Vaccine! @external
  }

  
  extend type Query {
    prise(id: ID!): Prise
    priseList: [Prise!]
  }

  extend type Mutation {
    createPrise(
      date: String!
      notes: String
      visitId: ID!
      vaccineId: ID!
    ): Prise!

    updatePrise(
      id: ID!
      date: String
      notes: String
      visitId: ID
      vaccineId: ID
    ): Prise!

    deletePrise(id: ID!): Prise!
  }
`;
