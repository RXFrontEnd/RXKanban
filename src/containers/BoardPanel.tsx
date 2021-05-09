import { useQuery } from "@apollo/client";
import BoardPanel from "../components/BoardPanel";
import { Board, Query } from "../models/type";
import { usePutBoard } from "../operations/mutations/putBoard";
import { GET_ORGANISATION } from "../operations/queries/getOrganisation";

interface BoardPanelProps {
    organisation: string
}

const Container = ({organisation} : BoardPanelProps) => {
    const { loading: organisationLoading, error: organisationError, data: boardData} = useQuery<Query>(GET_ORGANISATION, {
        variables: {
            organisationId: organisation
        }
    });

    const { putBoard, boardLoading, boardError } = usePutBoard();
    const doCreateBoard = async (name: string) => {
        try {
            await putBoard({
                variables: {
                    organisationId: organisation,
                    input: {
                        name: name
                    }  
                }
            });
            return '';
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const sortedData = boardData && boardData.organisation && [...boardData.organisation.boards];
    sortedData?.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

    return <BoardPanel 
                boards={sortedData as Board[]}  
                doCreateBoard={doCreateBoard}
                error={
                    (organisationError && organisationError.message)
                    || (boardError && boardError.message)
                }
                loading={organisationLoading || boardLoading} />
}

export default Container;