import React, { useState } from 'react';
import './index.css';
import { Mutations, TicketInput } from '../../models/type';
import { FetchResult } from '@apollo/client';

export type AddTicketProps = {
    handleAdd?: (name:string, description?: string) => Promise<FetchResult<Mutations, Record<string, any>, Record<string, any>>>
}

function AddTicket(props: AddTicketProps) {
    const {handleAdd} = props;
    
    const [ticket, setTicket] = useState<TicketInput>(
        {
        } as TicketInput
    );

    const handleClick = () => {
        // validation
        if(!handleAdd){
            return;
        }
        if(!ticket.name){
            return;
        }

        handleAdd(ticket.name, ticket.description ? ticket.description : '');
    }

    return (
        <div className='add-ticket-container'>
            <input 
                className='add-ticket-name' 
                placeholder='Name'
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        ticket.name = e.target.value;
                        setTicket(ticket);
                    }
                } />
            <input 
                className='add-ticket-description' 
                placeholder='Description'
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        ticket.description = e.target.value;
                        setTicket(ticket);
                    }
                }  />
            <span className='add-ticket-submit' onClick={handleClick}>+</span>
        </div>
    )
}

export default AddTicket;

