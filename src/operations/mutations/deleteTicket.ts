import { gql, useMutation } from "@apollo/client";
import { appStateVar } from "../../apollo/cache";
import { Mutations, MutationsDeleteTicketArgs, MutationsPutTicketArgs } from '../../models/type';
import { GET_BOARD } from "../queries/getBoard";

const DELETE_TICKET = gql`
    mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {
    deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {
      id
      name
      description
      status
      visible
    }
  }
`;

export function useDeleteTicket(){
    const appState = appStateVar();

    const [deleteTicket, {loading, error, data}] = useMutation<Mutations, MutationsDeleteTicketArgs>(
        DELETE_TICKET,
        {
            refetchQueries: [
              { 
                  query: GET_BOARD,
                  variables: {
                       organisationId: appState.orgId,
                       boardId: appState.currentBoardId
                    }
                }
            ]
          }
        );
        return {deleteTicket, deleteTicketLoading: loading, deleteTicketData: data, deleteTicketError: error};
}






