import { gql, useMutation } from "@apollo/client";
import { appStateVar } from "../../apollo/cache";
import { Mutations, MutationsPutBoardArgs, Query } from '../../models/type';
import { GET_ORGANISATION } from "../queries/getOrganisation";

const PUT_BOARD = gql`
    mutation putBoard($organisationId: ID!, $boardId: ID, $input: BoardInput!) {
    putBoard(organisationId: $organisationId, boardId: $boardId, input: $input) {
        id
        name
        
        createdAt
        updatedAt
        tickets {
        name
        description
        status
        }  
    }
    }
`;

export function usePutBoard(){
    const appState = appStateVar();
    const [putBoard, {loading, error, data}] = useMutation<Mutations, MutationsPutBoardArgs>(
        PUT_BOARD,
        {
            update(cache, {data}){
                const newBoard = data?.putBoard;
                const currentOrganisation = cache.readQuery<Query['organisation']>(
                  {
                    query: GET_ORGANISATION,
                    variables: {
                      organisationId: appState.orgId,
                    }
                  }
                );
                
                if(currentOrganisation && newBoard){
                  let currentBoards = currentOrganisation.boards;
                  if(!currentBoards){
                    currentBoards = [];
                  }
                  cache.writeQuery({
                    query: GET_ORGANISATION,
                    variables: {
                      organisationId: appState.orgId,
                    },
                    data:{
                        organisation:{
                        ...currentOrganisation,
                        tickets: [
                          ...currentBoards,
                          newBoard
                        ]
                      }
                    }
                  });
                }
              }
        }
    );
    return {putBoard, boardLoading: loading, boardData: data, boardError: error};
}

/**
 * refetchQueries: [
              { 
                  query: GET_ORGANISATION,
                  variables: { organisationId: appStateVar().orgId }
                }
            ]
 * 
 */