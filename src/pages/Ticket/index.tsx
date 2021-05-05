import React from 'react';
import './index.css';
import Header from '../../components/Header';
import { appStateVar } from '../../apollo/cache';
import { GET_BOARD } from '../../operations/queries/getBoard';
import { useQuery } from '@apollo/client';
import { Query } from '../../models/type';
import Column from '../../components/Column';
import './index.css';

function TicketPage() {
    const appState = appStateVar();
    const handleClick = () => {
        const newState = {...appState};
        newState.currentBoardId = '';
        newState.currentBoardName = '';
        appStateVar(newState);
    }
    
    const { loading, data} = useQuery<Query>(GET_BOARD, {
        variables: {
            "organisationId": appState.orgId,
            "boardId": appState.currentBoardId
        }
    });

    return (
        
        <div>
            <Header title={appState.orgName
                .concat(' - ')
                .concat(appState.currentBoardName)
                .concat(' - Ticket')}
                userName={appState.userName}
                handleClick={handleClick} />
            <div className='ticket-column-container'>
                <Column title='TODO' bgColor='#b1b1b1' allowAdd={true}/>
                <Column title='IN-PROGRESS' bgColor='#d1d1d1'/>
                <Column title='DONE' bgColor='#a1a1a1'/>
            </div>
            { 
            loading ? 'loading ticket data' 
            : data?.board?.tickets.map( ticket => 
                <div>{ticket.name}</div>
            ) 
            }
        </div>
    )
}

export default TicketPage
