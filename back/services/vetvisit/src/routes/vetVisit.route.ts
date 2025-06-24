import { userResolver } from "../resolvers/user.resolver";
import { visitResolver } from "../resolvers/visit.resolver";

export const resolvers = {
  Query: {
    ...visitResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...visitResolver.Mutation,
    ...userResolver.Mutation,
  }
};