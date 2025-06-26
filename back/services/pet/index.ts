import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { AppDataSource } from './src/config/ormConfig';
import { petResolver } from './src/resolvers/pet.resolver';
import { VetVisitResolver } from './src/resolvers/vetVisit.resolver';
import { PetTypeDefs } from './src/schema/pet.graphql';
import { VetVisitTypeDefs } from './src/schema/vetVisit.graphql';


AppDataSource.initialize().then(() => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs: PetTypeDefs,
        resolvers: petResolver
      },
      {
        typeDefs: VetVisitTypeDefs,
        resolvers: VetVisitResolver
      }
    ])
  });

  startStandaloneServer(server, {
    listen: { port: 4008 },
    context: async () => ({ dataSource: AppDataSource })
  });
});