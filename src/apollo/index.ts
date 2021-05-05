import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { cache, appStateVar } from './cache';

const httpLink = new HttpLink(
    {
      uri: 'https://14g8921io8.execute-api.us-east-1.amazonaws.com/ryan-dev-example-graphql-api'
    }
  );
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: appStateVar().userId
      }
    });
    return forward(operation);
  });

export const client = new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });