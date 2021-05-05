import React from 'react';
import './index.css';
import AddTicket from '../../components/AddTicket';

export type ColumnProps = {
    bgColor? : string;
    title: string;
    allowAdd: boolean;
}

function Column(props: ColumnProps) {
    
    return (
        <div 
            className='column-container' 
            style={{backgroundColor: props.bgColor}}>
            <h3 className='column-title'>{props.title}</h3>
            {props.allowAdd ? <AddTicket /> : <></>}
        </div>
    )
}

Column.defaultProps = {
    allowAdd: false
}

export default Column
