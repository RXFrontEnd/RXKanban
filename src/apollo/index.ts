import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { API_URL } from '../utils/constant';
import { cache, appStateVar } from './cache';


const httpLink = new HttpLink(
    {
      uri: API_URL
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