import React, { useState } from 'react'
import { TicketProps } from '../../models/localType';
import { TicketInput, TicketStatus } from '../../models/type';
import './index.css';

interface EditTicketProps extends TicketProps {
    handleUpdate: (id: string, ticket: TicketInput) => Promise<string>;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    callBack: (operation: 'close'|'update', error?: string) => void;
}

function EditTicket(props: EditTicketProps) {
    const { handleClose, handleUpdate, callBack, id } = props;
    const [ticket, setTicket] = useState({
        name: props.name,
        description: props.description,
        visible: props.visible,
        status: props.status
    } as TicketInput);

    const handleClickForUpdate = async (event: React.MouseEvent) => {
        event.stopPropagation();
        callBack('update', await handleUpdate(id, ticket));
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
                    }}
                    defaultValue={ticket.status?.toUpperCase()}>
                        {
                            options.map(o => <option key={o.value} value={o.value}>{o.name}</option>)
                        }
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
                        onClick={ handleClose }>
                            Cancle
                </button>
            </div>
            
        </div>
    )
}

const options = [
    {
        value: TicketStatus.Todo,
        name: TicketStatus.Todo.toUpperCase()
    },
    {
        value: TicketStatus.Inprogress,
        name: TicketStatus.Inprogress.toUpperCase()
    },
    {
        value: TicketStatus.Done,
        name: TicketStatus.Done.toUpperCase()
    }
];

export default EditTicket;
