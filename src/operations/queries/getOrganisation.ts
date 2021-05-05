import { gql } from "@apollo/client";

export const GET_ORGANISATION = gql`
  query organisation($organisationId: ID!) {
  organisation(organisationId: $organisationId) {
    id
    name
    timezone
    createdAt
    updatedAt
    
    boards {
      id
      name
    }
    
  }
}`;