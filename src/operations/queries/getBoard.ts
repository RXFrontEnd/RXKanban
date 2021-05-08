import { gql } from "@apollo/client";

export const GET_BOARD = gql`
  query board($organisationId: ID!, $boardId: ID!) {
  board(organisationId: $organisationId, boardId: $boardId) {
    id
    name
    
    createdAt
    updatedAt
    tickets {
      id
      name
      description
      status
      visible
      createdAt
    }  
  }
}`;