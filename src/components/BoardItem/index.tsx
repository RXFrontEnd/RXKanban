import React from 'react';
import { appStateVar } from '../../apollo/cache';
import './index.css';

export type BoardItemProps = {
    id: string;
    name: string;
    ticketsCount: number;
}

function BoardItem(props: BoardItemProps) {
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const appState = {...appStateVar() };
        appState.currentBoardId = props.id;
        appState.currentBoardName = props.name;
        appStateVar(appState);
    }

    return (
        <div className='board-item-container' onClick={handleClick}>
            <h2 className='board-item-name'>{props.name}</h2>
            <span>{`${props.ticketsCount} tickets`}</span>
        </div>
    )
}

export default BoardItem
