import { useQuery } from '@apollo/client';
import React from 'react';
import Header from '../../components/Header'
import { Query } from '../../models/type';
import BoardItem from '../../components/BoardItem';
import { GET_ORGANISATION } from '../../operations/queries/getOrganisation';
import AddBoard from '../../components/AddBoard';
import './index.css'
import { appStateVar } from '../../apollo/cache';
import { usePutBoard } from '../../operations/mutations/putBoard';

function BoardPage() {
    const appState = appStateVar();
    const { loading, error, data: boardData} = useQuery<Query>(GET_ORGANISATION, {
        variables: {
            "organisationId": appState.orgId
        }
    });

    const { putBoard, boardLoading, boardError } = usePutBoard();
    const handleSubmit = (name: string) => putBoard({
        variables: {
            organisationId: appStateVar().orgId,
            input: {
                name: name
            }  
        }
    });

    if(boardError){
        alert(boardError.message);
    }
    
    return (
        <div className='board-frame'>
            <Header 
                title={appState.orgName.concat(' - Board')} 
                userName={appState.userName} />
            <div className='board-container'>
                {
                    loading ? <div className='board-info'>Loading border data</div> : 
                        error ? <div className='board-info'>{error.message}</div> :
                        <>
                            {boardData?.organisation?.boards.map(board =>(
                                <BoardItem 
                                    key={board.id}
                                    id={board.id}
                                    name={board.name}  />
                            ))}
                            <AddBoard handleSubmit={handleSubmit}/>
                        </>
                }
                
            </div>
            {boardLoading ? <div className='board-waiting'>please waiting</div> : <></>}
        </div>
    )
};

export default BoardPage;
