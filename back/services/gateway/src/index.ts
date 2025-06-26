import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";

const JWT_SECRET = "L2tUZocnBytcOvxbaNJMTQlbs6ELwuW8";

async function bootstrap() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: "vaccine",
          url: process.env.VACCINE_URL || "http://127.0.0.1:4005/graphql",
        },
        {
          name: "vetvisit",
          url: process.env.VETVISIT_URL || "http://127.0.0.1:4004/graphql",
        },
        {
          name: "auth",
          url: process.env.AUTH_URL || "http://127.0.0.1:4001/graphql",
        },
      ],
    }),

    // modify the context to include the user from the token
    buildService({ url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          //  authorization header
          if (context.token) {
            request.http?.headers.set(
              "Authorization",
              `Bearer ${context.token}`
            );
          }
          // set user in headers
          if (context.user) {
            request.http?.headers.set("user", JSON.stringify(context.user));
          }
        },
      });
    },
  });

  const server = new ApolloServer({
    gateway,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

      const user = getUserFromToken(token);

      return { token, user };
    },
  });
  console.log(`gateway running at ${url}`);
}

function getUserFromToken(token: string | null) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

bootstrap();
