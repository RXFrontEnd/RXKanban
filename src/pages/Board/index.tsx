import { useQuery } from '@apollo/client';
import React from 'react';
import Header from '../../components/Header'
import { LocalQueries } from '../../models/AppState';
import { Query } from '../../models/type';
import { GET_APP_STATE } from '../../operations/queries/appState';
import BoardItem from '../../components/BoardItem';
import { GET_ORGANISATION } from '../../operations/queries/getOrganisation';

function BoardPage() {
    const { data: appData } = useQuery<LocalQueries>(GET_APP_STATE);
    const appState = appData?.appState;

    const {loading, data: boardData} = useQuery<Query>(GET_ORGANISATION)

    
    return (
        <>
            <Header title={appState ? appState.orgName.concat(' - Board') : 'Board'} userName={appState?.userName as string} />
            {loading ? 'loading boards data' : (<div className='board_container'>
                {
                    boardData?.organisation?.boards.map(board =>(
                        <BoardItem name={board.name} ticketsCount={board.tickets.length} />
                    ))
                }
            </div>)}
            
        </>
    )
};

export default BoardPage;
