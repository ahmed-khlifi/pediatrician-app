import { petResolver } from "../resolvers/pet.resolver";
import { VetVisitResolver } from "../resolvers/vetVisit.resolver";

export const resolvers = {
  Query: {
    ...VetVisitResolver.Query,
    ...petResolver.Query,
  },
  Mutation: {
    ...VetVisitResolver.Mutation,
    ...petResolver.Mutation,
  }
};