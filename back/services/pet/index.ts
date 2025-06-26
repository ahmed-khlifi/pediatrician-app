import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { AppDataSource } from './src/config/ormConfig';
import { petResolver } from './src/resolvers/pet.resolver';
import { VetVisitResolver } from './src/resolvers/vetVisit.resolver';
import { PetTypeDefs } from './src/schema/pet.graphql';
import { PriseTypeDefs } from "./src/schema/prise.graphql";
import { UserAppTypeDefs } from "./src/schema/user.grapphql";
import { VaccineTypeDefs } from "./src/schema/vaccine.graphql";
import { VetVisitTypeDefs } from "./src/schema/vetVisit.graphql";

AppDataSource.initialize().then(() => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs: PetTypeDefs,
        resolvers: petResolver,
      },
      {
        typeDefs: VetVisitTypeDefs,
        resolvers: VetVisitResolver,
      },
      {
        typeDefs: VaccineTypeDefs,
      },
      {
        typeDefs: UserAppTypeDefs,
      },
      {
        typeDefs: PriseTypeDefs,
      },
    ]),
  });

  startStandaloneServer(server, {
    listen: { port: 4008 },
    context: async () => ({ dataSource: AppDataSource }),
  });
});