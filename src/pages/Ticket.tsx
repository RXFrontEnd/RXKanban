import React from 'react'
import { appStateVar } from '../apollo/cache';
import Header from '../components/Header';
import TicketPanel from '../containers/TicketPanel';

function Ticket() {
    const appState = appStateVar();
    const handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
        e.stopPropagation();
        appStateVar({...appState, currentBoardId:'', currentBoardName: ''});
    }
    return (
        <>
            <Header 
                title={appState.orgName
                    .concat(' - ')
                    .concat(appState.currentBoardName)
                    .concat(' - Ticket')}
                    userName={appState.userName}
                    handleClick={handleClick} />
            <TicketPanel 
                organisation={appState.orgId} 
                board={appState.currentBoardId} />
        </>
    )
}

export default Ticket
