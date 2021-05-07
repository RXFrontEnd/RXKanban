import React, { useState } from 'react';
import './index.css';
import AddTicket from '../../components/AddTicket';
import { Ticket, TicketInput, TicketStatus } from '../../models/type';
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
    
    const handleUpdate = (id:string, ticket: TicketInput) => putTicket(
        {
            variables: {
                organisationId: appState.orgId,
                boardId: appState.currentBoardId,
                ticketId: id,
                input: ticket
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

    const [showAll, setShowAll] = useState(false);
    
    return (
        <div 
            className='column-container' 
            style={{backgroundColor: props.bgColor}}>
                <div>
                    <div className='column-header-container'>
                        <h3 className='column-title'>{props.title}</h3>
                        <input 
                            className='column-showall' 
                            type='checkbox'
                            checked={showAll}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setShowAll(!showAll)
                            }}/>
                    </div>
                    {
                        props.tickets?.map( ticket => {
                            if(showAll || ticket.visible){
                                return (<TicketItem 
                                    key={ticket.id} 
                                    id={ticket.id}
                                    name={ticket.name}
                                    description={ticket.description}
                                    status={ticket.status}
                                    visible={ticket.visible}
                                    handleDelete={handleDelete}
                                    handleUpdate={handleUpdate}
                                />)
                            }else{
                                return '';
                            }
                        })
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
