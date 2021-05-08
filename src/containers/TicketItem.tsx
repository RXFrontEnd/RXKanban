import React, { useState } from 'react';
import EditTicket from '../components/EditTicket';
import TicketItem from '../components/TicketItem';
import { TicketProps } from '../models/localType';
import { TicketInput } from '../models/type';

interface TicketItemContainerProps extends TicketProps {
    handleUpdate: (id: string, ticket: TicketInput) => void;
    handleDelete: (id: string) => void;
}

function Container(props: TicketItemContainerProps) {
    const { handleUpdate ,handleDelete, ...rest} = props;
    const [isEdit, setIsEdit] = useState(false);

    const handleClickForEdit = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsEdit(true);
    }

    const handleClickForClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsEdit(false)
    };

    const callback = (operation: 'close'|'update') => {
        if(operation === 'update'){
            setIsEdit(!!props.error);
        }
    }

    return (
        <>
        {
            isEdit ? 
                <EditTicket
                    handleClose={handleClickForClose}
                    handleUpdate={props.handleUpdate}
                    callBack={callback}
                    {...rest}
                     /> 
                : <TicketItem
                    handleEdit={handleClickForEdit}
                    handleDelete={handleDelete}
                    {...rest} />
        }
        </>
    )
}

export default Container;
