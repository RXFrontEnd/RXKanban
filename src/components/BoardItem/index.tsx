import React from 'react'

export type BoardItemProps = {
    name: string;
    ticketsCount: number;
}

function BoardItem(props: BoardItemProps) {
    
    return (
        <div>
            <h2>{props.name}</h2>
            <span>{`${props.ticketsCount} tickets`}</span>
        </div>
    )
}

export default BoardItem
