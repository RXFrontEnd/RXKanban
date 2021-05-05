import { gql, useMutation } from "@apollo/client";
import { Mutations, MutationsCreateUserArgs } from '../../models/type';
import { appStateVar } from '../../apollo/cache';
import { AppState } from "../../models/AppState";

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
    const [putBoard, {loading, error, data}] = useMutation<Mutations, MutationsCreateUserArgs>(
        PUT_BOARD
        );
        return {putBoard, boardLoading: loading, boardData: data, boardError: error};
}
