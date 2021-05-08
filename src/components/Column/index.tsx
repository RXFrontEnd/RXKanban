import React, { useState } from 'react';
import './index.css';
import AddTicket from '../../components/AddTicket';
import { Ticket, TicketInput, TicketStatus } from '../../models/type';
import TicketItem from '../../components/TicketItem';
import { usePutTicket } from '../../operations/mutations/putTicket';
import { useDeleteTicket } from '../../operations/mutations/deleteTicket';
import Overlay from '../../components/Overlay';

export type ColumnProps = {
    bgColor? : string;
    title: string;
    allowAdd: boolean;
    tickets?: Ticket[];
    organisation: string;
    board: string;
    loading: boolean;
}

function Column(props: ColumnProps) {

    const [showAll, setShowAll] = useState(false);

    const {putTicket, ticketLoading, ticketError} = usePutTicket();

    const doAdd = async (name:string, description?:string) => {
        try {
            await putTicket({
                variables: {
                    organisationId: props.organisation,
                    boardId: props.board,
                    input: {
                        name,
                        description,
                        status: TicketStatus.Todo,
                        visible: true
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
        
    };

    const doUpdate = async (id:string, ticket: TicketInput) => {
        try {
            await putTicket(
                {
                    variables: {
                        organisationId: props.organisation,
                        boardId: props.board,
                        ticketId: id,
                        input: ticket
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const {deleteTicket, deleteTicketLoading, deleteTicketError} = useDeleteTicket();
    const doDelete = async (id:string) => {
        try {
            await deleteTicket(
                {
                    variables: {
                        organisationId: props.organisation,
                        ticketId:id
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    ticketError && alert(ticketError.message);
    deleteTicketError && alert(deleteTicketError.message);
    
    return (
        <div 
            className='column-container' 
            style={{backgroundColor: props.bgColor}}>
            <div>
                    <div className='column-header-container'>
                        <h3 className='column-title'>{props.title}</h3>
                        <div className='column-showall-container'>
                            <input 
                                className='column-showall' 
                                type='checkbox'
                                id='all'
                                checked={showAll}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setShowAll(!showAll)
                                }}/>
                            <label className='column-showall-label' htmlFor='all'>All</label>
                        </div>
                        
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
                                    handleDelete={doDelete}
                                    handleUpdate={doUpdate}
                                    error={
                                        (ticketError && ticketError.message)
                                        || (deleteTicketError && deleteTicketError.message)
                                    }
                                />)
                            }else{
                                return <></>;
                            }
                        })
                    }
                </div>
            {props.allowAdd ? <AddTicket handleAdd={doAdd} error={ticketError && ticketError.message} /> : <></>}
            {props.loading || ticketLoading || deleteTicketLoading ? <Overlay message='please waiting...' /> : <></>}
        </div>
    )
}

export default Column
