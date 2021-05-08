import React from 'react';
import { TicketProps } from '../../models/localType';
import './index.css';

interface TicketItemProps extends TicketProps {
    handleDelete?: (id: string) => void;
    handleEdit: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function TicketItem(props: TicketItemProps) {

    const {handleDelete, handleEdit} = props;
    const handleClickForDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        if(!handleDelete){
            return;
        }
        handleDelete(props.id);
    }

    return (
        <div className='ticket-item-container' onClick={handleEdit} >
            <span className='ticket-item-text ticket-item-text-name'>{props.name}</span>
            <span className='ticket-item-text ticket-item-text-description'>{props.description}</span>
            <span className='ticket-item-delete' onClick={handleClickForDelete}>x</span>
        </div>
    );
}

export default TicketItem;
