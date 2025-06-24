import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import { resolvers } from './resolver';
import { Owner } from './entity';
import { DataSource } from 'typeorm';
import { typeDefs } from './schema';
import { AppDataSource } from './ormconfig';


/**4
 * const dataSource = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    synchronize: true,
    logging: false,
    database: 'pet',
    entities: [Owner]
});

 */
AppDataSource.initialize().then(() => {
    const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs: typeDefs, resolvers }]),
    });

    startStandaloneServer(server, {
        listen: { port: 4002 },
        context: async () => ({ dataSource: AppDataSource }),
    });
});