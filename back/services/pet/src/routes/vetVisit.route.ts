import { petResolver } from "../resolvers/pet.resolver";
import { visitResolver } from "../resolvers/visit.resolver";

export const resolvers = {
  Query: {
    ...visitResolver.Query,
    ...petResolver.Query,
  },
  Mutation: {
    ...visitResolver.Mutation,
    ...petResolver.Mutation,
  }
};