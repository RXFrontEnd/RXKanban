import { useQuery } from '@apollo/client';
import React from 'react'
import Column from '../components/Column';
import { Query, TicketStatus } from '../models/type';
import { GET_BOARD } from '../operations/queries/getBoard';

interface TicketPanelProps {
    organisation: string;
    board: string;
}

const columns = [
    {
        title: 'TODO',
        bgColor: '#b1b1b1',
        allowAdd: true,
        status: TicketStatus.Todo
    },
    {
        title: 'IN-PROGRESS',
        bgColor: '#d1d1d1',
        allowAdd: false,
        status: TicketStatus.Inprogress
    },
    {
        title: 'DONE',
        bgColor: '#a1a1a1',
        allowAdd: false,
        status: TicketStatus.Done
    }
]

function Container({organisation, board}: TicketPanelProps) {

    const { loading, error, data} = useQuery<Query>(GET_BOARD, {
        variables: {
            organisationId: organisation,
            boardId: board
        }
    });

    error && alert(error.message);

    return (
        <div style={{display:'flex', height:'82vh'}}>
            {
                columns.map(column => <Column
                    title={column.title} 
                    bgColor={column.bgColor} 
                    allowAdd={column.allowAdd}
                    tickets={data?.board?.tickets.filter(t => t.status === column.status)}
                    loading={loading}
                    organisation={organisation}
                    board={board} />)
            }
        </div>
    )
}

export default Container
