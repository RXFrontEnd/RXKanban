import { useQuery } from "@apollo/client";
import BoardPanel from "../components/BoardPanel";
import { Query } from "../models/type";
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
    const doCreateBoard = (name: string) => putBoard({
        variables: {
            organisationId: organisation,
            input: {
                name: name
            }  
        }
    });

    return <BoardPanel 
                boards={boardData?.organisation?.boards}  
                doCreateBoard={doCreateBoard}
                error={
                    (organisationError && organisationError.message)
                    || (boardError && boardError.message)
                }
                loading={organisationLoading || boardLoading} />
}

export default Container;