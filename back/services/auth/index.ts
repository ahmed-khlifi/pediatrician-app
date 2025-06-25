import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { AppDataSource } from "./src/config/ormconfig";
import { authResolver } from "./src/resolvers/user.resolver";
import { UserAppTypeDefs } from "./src/schema/UserApp.graphql";

AppDataSource.initialize().then(() => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs: UserAppTypeDefs,
        resolvers: authResolver,
      },
    ]),
  });

  startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async () => ({ dataSource: AppDataSource }),
  });
});
