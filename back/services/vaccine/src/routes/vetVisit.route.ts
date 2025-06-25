import { priseResolver } from "../resolvers/prise.resolver";
import { vaccineResolver } from "../resolvers/vaccine.resolver";

export const resolvers = {
  Query: {
    ...priseResolver.Query,
    ...vaccineResolver.Query,
  },
  Mutation: {
    ...priseResolver.Mutation,
    ...vaccineResolver.Mutation,
  }
};