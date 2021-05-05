import { gql, useMutation } from "@apollo/client";
import { appStateVar } from "../../apollo/cache";
import { Mutations, MutationsPutBoardArgs } from '../../models/type';
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
    const [putBoard, {loading, error, data}] = useMutation<Mutations, MutationsPutBoardArgs>(
        PUT_BOARD,
        {
            refetchQueries: [
              { 
                  query: GET_ORGANISATION,
                  variables: { organisationId: appStateVar().orgId }
                }
            ]
          }
        );
        return {putBoard, boardLoading: loading, boardData: data, boardError: error};
}
