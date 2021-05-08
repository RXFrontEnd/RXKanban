import React, { useState } from 'react'
import { TicketProps } from '../../models/localType';
import { TicketInput, TicketStatus } from '../../models/type';
import './index.css';

interface EditTicketProps extends TicketProps {
    handleUpdate: (id: string, ticket: TicketInput) => void;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    callBack: (operation: 'close'|'update') => void;
}

function EditTicket(props: EditTicketProps) {

    const [ticket, setTicket] = useState({
        name: props.name,
        description: props.description,
        status: props.status,
        visible: props.visible
    } as TicketInput);

    const handleClickForUpdate = async (event: React.MouseEvent) => {
        event.stopPropagation();
        props.handleUpdate(props.id, ticket);
        props.callBack('update');
    }

    return (
        <div className='ticket-item-edit-container'>
            <input 
                className='ticket-item-edit ticket-item-input-name' 
                type='text' 
                value={ticket.name as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTicket({...ticket, name: e.target.value});
                }} />
            <input 
                className='ticket-item-edit ticket-item-input-description' 
                type='text' 
                value={ticket.description as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTicket({...ticket, description: e.target.value});
                }}  />
            <select className='ticket-item-edit' 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setTicket({...ticket, status: e.target.value as TicketStatus})
                    }}>
                <option 
                    value={TicketStatus.Todo} 
                    selected={ticket.status === TicketStatus.Todo}>
                        Todo
                </option>
                <option 
                    value={TicketStatus.Inprogress}
                    selected={ticket.status === TicketStatus.Inprogress}>
                        Inprogress
                </option>
                <option 
                    value={TicketStatus.Done}
                    selected={ticket.status === TicketStatus.Done}>
                        Done
                </option>
            </select>
            <div className='ticket-item-edit-visible-container'>
                <input 
                    id='visible' 
                    className='ticket-item-edit ticket-item-edit-visible' type='checkbox'
                    checked={ticket.visible as boolean}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTicket({...ticket, visible: !ticket.visible})
                    }} />
                <label htmlFor='visible'>visible</label>
            </div>
            <div>
                <button className='ticket-item-edit-button green-button'
                        onClick={handleClickForUpdate}>
                            Ok
                </button>
                <button className='ticket-item-edit-button red-button' 
                        onClick={ props.handleClose }>
                            Cancle
                </button>
            </div>
            
        </div>
    )
}

export default EditTicket;
