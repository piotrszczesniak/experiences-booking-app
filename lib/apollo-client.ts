import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      }),
      cache: new InMemoryCache(),
    });
  }
  return client;
};

// ! super useful video with explanation how to use Apollo Client with Next (server components)
// 1. Youtube video: https://www.youtube.com/watch?v=buhHZksGM84
// 2. https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// 3. https://patrick.wtf/
