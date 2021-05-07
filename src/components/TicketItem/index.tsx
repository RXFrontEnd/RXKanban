import { FetchResult } from '@apollo/client';
import React, { useState } from 'react';
import { Mutations, TicketInput, TicketStatus } from '../../models/type';
import './index.css';

export type TicketItemProps = {
    id: string;
    name: string;
    description?: string;
    status: string;
    visible: boolean;
    handleDelete?: (id: string) => Promise<FetchResult<Mutations, Record<string, any>, Record<string, any>>>;
    handleUpdate?: (id: string, ticket: TicketInput) => Promise<FetchResult<Mutations, Record<string, any>, Record<string, any>>>;
}

function TicketItem(props: TicketItemProps) {

    const [isEdit, setIsEdit] = useState(false);
    const [ticket, setTicket] = useState({
        name: props.name,
        description: props.description,
        status: props.status,
        visible: props.visible
    } as TicketInput);

    const {handleDelete, handleUpdate} = props;

    const handleClickForDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        if(!handleDelete){
            return;
        }
        handleDelete(props.id);
    }

    const handleClickForEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsEdit(true);
    }

    const handleClickForUpdate = async () => {
        if(!handleUpdate){
            return;
        }
        await handleUpdate(props.id, ticket);
        setIsEdit(false);
    }

    return (
        <>
        {
            isEdit ? (
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
                                onClick={()=> setIsEdit(false)}>
                                    Cancle
                        </button>
                    </div>
                    
                </div>
            ) 
            : (
                <div className='ticket-item-container' onClick={handleClickForEdit} >
                    <span className='ticket-item-text ticket-item-text-name'>{props.name}</span>
                    <span className='ticket-item-text ticket-item-text-description'>{props.description}</span>
                    <span className='ticket-item-delete' onClick={handleClickForDelete}>x</span>
                </div>
            )
        }
        </>
        
    )
}

export default TicketItem;
