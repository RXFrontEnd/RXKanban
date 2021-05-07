import { gql, useMutation } from "@apollo/client";
import { appStateVar } from "../../apollo/cache";
import { Mutations, MutationsPutTicketArgs, Query } from '../../models/type';
import { GET_BOARD } from "../queries/getBoard";

const PUT_TICKET = gql`
    mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {
    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {
      id
      name
      description
      status
      visible
    }
  }
`;

export function usePutTicket(){
    const appState = appStateVar();

    const [putTicket, {loading, error, data}] = useMutation<Mutations, MutationsPutTicketArgs>(
      PUT_TICKET,
      {
          update(cache, {data}){
            const newTicket = data?.putTicket;
            const currentBoard = cache.readQuery<Query['board']>(
              {
                query: GET_BOARD,
                variables: {
                  organisationId: appState.orgId,
                  boardId: appState.currentBoardId
                }
              }
            );
            
            if(currentBoard && newTicket){
              let currentTickets = currentBoard.tickets;
              if(!currentTickets){
                currentTickets = [];
              }
              cache.writeQuery({
                query: GET_BOARD,
                variables: {
                  organisationId: appState.orgId,
                  boardId: appState.currentBoardId
                },
                data:{
                  board:{
                    ...currentBoard,
                    tickets: [
                      ...currentTickets,
                      newTicket
                    ]
                  }
                }
              });
            }
        }
      }
    );
    return {putTicket, ticketLoading: loading, ticketData: data, ticketError: error};
}

/**
 * refetchQueries: [
              { 
                  query: GET_BOARD,
                  variables: {
                       organisationId: appState.orgId,
                       boardId: appState.currentBoardId
                    }
                }
            ]
 */


