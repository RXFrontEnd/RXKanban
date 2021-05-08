import React from 'react';
import { appStateVar } from '../../apollo/cache';
import './index.css';

export type BoardItemProps = {
    id: string;
    name: string;
}

function BoardItem(props: BoardItemProps) {
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const appState = appStateVar();
        appStateVar({...appState, currentBoardId: props.id, currentBoardName: props.name});
    }

    return (
        <div className='board-item-container' onClick={handleClick}>
            <h2 className='board-item-name'>{props.name}</h2>
        </div>
    )
}

export default BoardItem
