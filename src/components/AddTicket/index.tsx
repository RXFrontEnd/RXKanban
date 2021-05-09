import React, { useRef, useState, KeyboardEvent } from 'react';
import './index.css';
import { TicketInput } from '../../models/type';

export type AddTicketProps = {
    handleAdd?: (name:string, description?: string) => Promise<string>;
}

function AddTicket(props: AddTicketProps) {
    const {handleAdd} = props;
    
    const [ticket, setTicket] = useState<TicketInput>({} as TicketInput);

    const refName = useRef<HTMLInputElement>(null);
    const refDescription = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        // validation
        if(!handleAdd){
            return;
        }
        if(!ticket.name){
            alert('name cannot empty');
            return;
        }

        const error = await handleAdd(ticket.name, ticket.description ? ticket.description : '');

        if(!error){
            // reset
            refName.current && (refName.current.value = '');
            refDescription.current && (refDescription.current.value = '');
            setTicket({});
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>)=>{
        e.stopPropagation();
        if (e.key === 'Enter') {
            handleClick();
        }
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
                }
                onKeyDown={handleKeyDown} />
            <input
                ref={refDescription}
                className='add-ticket-description' 
                placeholder='Description'
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        setTicket({...ticket, description: e.target.value});
                    }
                }
                onKeyDown={handleKeyDown}  />
            <span className='add-ticket-submit' onClick={handleClick}>+</span>
        </div>
    )
}

export default AddTicket;

