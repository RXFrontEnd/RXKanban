import { useQuery } from '@apollo/client';
import React from 'react';
import Header from '../../components/Header'
import { Query } from '../../models/type';
import BoardItem from '../../components/BoardItem';
import { GET_ORGANISATION } from '../../operations/queries/getOrganisation';
import AddBoard from '../../components/AddBoard';
import './index.css'
import { appStateVar } from '../../apollo/cache';

function BoardPage() {
    const appState = appStateVar();
    const { loading, data: boardData} = useQuery<Query>(GET_ORGANISATION, {
        variables: {
            "organisationId": appState.orgId
        }
    });
    
    return (
        <>
            <Header 
                title={appState.orgName.concat(' - Board')} 
                userName={appState.userName} />
            {
            loading ? 'loading boards data' : (<div className='board-container'>
                {
                    boardData?.organisation?.boards.map(board =>(
                        <BoardItem 
                            key={board.id}
                            id={board.id}
                            name={board.name} 
                            ticketsCount={board.tickets ? board.tickets.length : 0} />
                    ))
                }
                <AddBoard />
            </div>)}
            
        </>
    )
};

export default BoardPage;
