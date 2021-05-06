import React from 'react';
import './index.css';
import AddTicket from '../../components/AddTicket';
import { Ticket, TicketStatus } from '../../models/type';
import TicketItem from '../../components/TicketItem';
import { usePutTicket } from '../../operations/mutations/putTicket';
import { appStateVar } from '../../apollo/cache';
import { useDeleteTicket } from '../../operations/mutations/deleteTicket';

export type ColumnProps = {
    bgColor? : string;
    title: string;
    allowAdd: boolean;
    tickets?: Ticket[];
}

function Column(props: ColumnProps) {
    const appState = appStateVar();
    const {putTicket} = usePutTicket();
    const handleAdd = (name:string, description?:string) => putTicket(
                {
                    variables: {
                        organisationId: appState.orgId,
                        boardId: appState.currentBoardId,
                        input: {
                            name,
                            description,
                            status: TicketStatus.Todo,
                            visible: true
                        }
                    }
                }
            );
    
        const {deleteTicket} = useDeleteTicket();
        const handleDelete = (id:string) => deleteTicket(
            {
                variables: {
                    organisationId: appState.orgId,
                    ticketId:id
                }
            }
        );
    
    return (
        <div 
            className='column-container' 
            style={{backgroundColor: props.bgColor}}>
                <div>
                    <div className='column-header-container'>
                        <h3 className='column-title'>{props.title}</h3>
                        <input className='column-showall' type='checkbox'/>
                    </div>
                    {
                        props.tickets?.map( ticket => 
                        <TicketItem 
                            key={ticket.id} 
                            id={ticket.id}
                            name={ticket.name}
                            description={ticket.description}
                            status={ticket.status}
                            handleDelete={handleDelete}
                        />)
                    }
                </div>
            
            
            {props.allowAdd ? <AddTicket handleAdd={handleAdd} /> : <></>}
        </div>
    )
}

Column.defaultProps = {
    allowAdd: false,
    tickets: [
        
    ]
}

export default Column
