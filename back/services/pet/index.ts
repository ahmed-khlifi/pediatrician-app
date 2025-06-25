import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { AppDataSource } from './src/config/ormConfig';
import { resolvers } from './src/routes/vetVisit.route';
import { typeDefs } from './src/schema/typesDef';



AppDataSource.initialize().then(() => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers
      }
    ])
  });

  startStandaloneServer(server, {
    listen: { port: 4008 },
    context: async () => ({ dataSource: AppDataSource })
  });
});