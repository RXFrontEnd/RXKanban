import { Board } from '../../models/type'
import AddBoard from '../AddBoard'
import BoardItem from '../BoardItem'
import './index.css'

interface BoardPanelProps {
    boards?: Board[];
    doCreateBoard: (name: string) => void;
    error?: string;
    loading: boolean;
}

function BoardPanel({boards, doCreateBoard, error, loading}: BoardPanelProps) {

    error && alert(error);
    
    return (
        <div className='board-container'>
            {
                <>
                    {
                        boards && boards.map(board =>(
                            <BoardItem 
                                key={board.id}
                                id={board.id}
                                name={board.name}  />
                        ))
                    }
                    <AddBoard doCreateBoard={doCreateBoard}/>
                    {loading ? <div className='board-waiting'>please waiting...</div> : <></>}
                </>
                    
            }
                
        </div>
    )
}

export default BoardPanel
