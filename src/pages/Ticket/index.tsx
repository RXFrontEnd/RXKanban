import React from 'react';
import './index.css';
import Header from '../../components/Header';
import { appStateVar } from '../../apollo/cache';
import { GET_BOARD } from '../../operations/queries/getBoard';
import { useQuery } from '@apollo/client';
import { Query, TicketStatus } from '../../models/type';
import Column from '../../components/Column';
import './index.css';

function TicketPage() {
    const appState = appStateVar();
    const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
        e.preventDefault();
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
                <Column 
                    title='TODO' 
                    bgColor='#b1b1b1' 
                    allowAdd={true}
                    tickets={
                        loading? [] : 
                        data?.board?.tickets.filter(t => t.status === TicketStatus.Todo)
                    }
                />
                <Column 
                    title='IN-PROGRESS' 
                    bgColor='#d1d1d1'
                    tickets={
                        loading? [] : 
                        data?.board?.tickets.filter(t => t.status === TicketStatus.Inprogress)
                    }/>
                <Column 
                    title='DONE' 
                    bgColor='#a1a1a1'
                    tickets={
                        loading? [] : 
                        data?.board?.tickets.filter(t => t.status === TicketStatus.Done)
                    }/>
            </div>
        </div>
    )
}

export default TicketPage
