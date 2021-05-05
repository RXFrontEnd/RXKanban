import { gql } from '@apollo/client';

export const GET_APP_STATE = gql`
  query GetAppState {
    appState @client
  }
`;