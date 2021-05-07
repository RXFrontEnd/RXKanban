import React, { useRef, useState } from 'react';
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

    const refName = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        // validation
        if(!handleAdd){
            return;
        }
        if(!ticket.name){
            alert('name cannot empty');
            return;
        }

        handleAdd(ticket.name, ticket.description ? ticket.description : '');

        // reset
        refName.current && (refName.current.value = '');
        refDescription.current && (refDescription.current.value = '');
        setTicket({} as TicketInput);
    }

    return (
        <div className='add-ticket-container'>
            <input 
                ref={refName}
                className='add-ticket-name' 
                placeholder='Name'
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setTicket({...ticket, name: e.target.value});
                    }
                } />
            <input
                ref={refDescription}
                className='add-ticket-description' 
                placeholder='Description'
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setTicket({...ticket, description: e.target.value});
                    }
                }  />
            <span className='add-ticket-submit' onClick={handleClick}>+</span>
        </div>
    )
}

export default AddTicket;

