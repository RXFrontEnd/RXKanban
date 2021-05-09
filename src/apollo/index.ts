import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { hash } from '../utils/keyUtil';
import { cache, appStateVar } from './cache';

const apiUrl = process.env.REACT_APP_API_GATEWAY_URL?.concat(process.env.REACT_APP_API_GATEWAY_STAGE as string);
const httpLink = new HttpLink(
    {
      uri: apiUrl
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

const ENV_KEY = hash(apiUrl as string).toString();

export const generateKey = (value: string) => ENV_KEY.concat(value.toLowerCase());