import React from 'react'
import './index.css';

function SignUp() {
    const handleSubmit = () => {
        console.log("test");
    }
    return (
        <div>
            <h1>Board - Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' name='firstName' id='firstName' />
                </div>
                <div className='row'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' />
                </div>
                <div className='row'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' />
                </div>
                <div className='row'>
                    <label htmlFor='organisation'>Organisation</label>
                    <input type='text' name='organisation' id='organisation' />
                </div>
                <div className='row'>
                    <input className='start' type='submit' value='Start' />
                </div>
            </form>
        </div>
    )
}

export default SignUp
