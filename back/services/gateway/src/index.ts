import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

async function bootstrap() {
    const gateway = new ApolloGateway({
        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'vaccine', url: 'http://localhost:4005/graphql' },
                { name: 'vetvisit', url: 'http://localhost:4004/graphql' },
            ],
        }),
    });

    const server = new ApolloServer({
        gateway
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const token = req.headers.authorization?.split(' ')[1] || null;
            return { token };
        }
    });
    console.log(`gateway running at ${url}`);
}
bootstrap();