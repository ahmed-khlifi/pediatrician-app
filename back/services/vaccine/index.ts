import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { AppDataSource } from './src/config/ormConfig';
import { priseResolver } from './src/resolvers/prise.resolver';
import { vaccineResolver } from './src/resolvers/vaccine.resolver';
import { VaccineTypeDefs } from './src/schema/vaccine.graphql';
import { PriseTypeDefs } from './src/schema/prise.graphql';


AppDataSource.initialize().then(() => {
    const server = new ApolloServer({
        schema: buildSubgraphSchema([
            {
                typeDefs: VaccineTypeDefs,
                resolvers: vaccineResolver
            },
            {
                typeDefs: PriseTypeDefs,
                resolvers: priseResolver
            }
        ])
    });

    startStandaloneServer(server, {
        listen: { port: 4005 },
        context: async () => ({ dataSource: AppDataSource })
    });
});