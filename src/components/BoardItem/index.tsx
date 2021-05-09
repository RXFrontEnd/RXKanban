import React from 'react';
import { updateAppState } from '../../utils/appStateStore';
import './index.css';

export type BoardItemProps = {
    id: string;
    name: string;
}

function BoardItem(props: BoardItemProps) {
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        updateAppState({currentBoardId: props.id, currentBoardName: props.name});
    }

    return (
        <div className='board-item-container' onClick={handleClick}>
            <h2 className='board-item-name'>{props.name}</h2>
        </div>
    )
}

export default BoardItem
