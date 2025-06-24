import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';

async function bootstrap() {
    const gateway = new ApolloGateway({
        serviceList: [
            // List of services
        ]
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