// 📁 src/app/apollo.config.ts
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';

export function createApollo(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({ uri: 'http://localhost:4000/graphql' }), // ← URI de ton Gateway
    cache: new InMemoryCache(),
  };
}
