import { FetchResult } from '@apollo/client';
import React from 'react';
import { Mutations } from '../../models/type';
import './index.css';

export type TicketItemProps = {
    id: string;
    name: string;
    description?: string;
    status: string;
    handleDelete?: (id: string) => Promise<FetchResult<Mutations, Record<string, any>, Record<string, any>>>
}

function TicketItem(props: TicketItemProps) {

    const {handleDelete} = props;

    const handleClick = () => {
        console.log(props.id);
        if(!handleDelete){
            return;
        }
        handleDelete(props.id);
    }

    return (
        <div className='ticket-item-container' >
            <span className='ticket-item-text ticket-item-text-name'>{props.name}</span>
            <span className='ticket-item-text ticket-item-text-description'>{props.description}</span>
            <span className='ticket-item-delete' onClick={handleClick}>x</span>
        </div>
    )
}

export default TicketItem;
