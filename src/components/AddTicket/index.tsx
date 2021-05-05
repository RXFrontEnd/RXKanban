import './index.css';

import React from 'react'

function AddTicket() {
    return (
        <div className='add-ticket-container'>
            <input className='add-ticket-name' placeholder='Name' />
            <input className='add-ticket-description' placeholder='Description' />
            <span className='add-ticket-submit'>+</span>
        </div>
    )
}

export default AddTicket;
