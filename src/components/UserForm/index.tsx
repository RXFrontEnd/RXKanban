import React, { useState } from 'react'
import { UserInput } from '../../models/type';
import './index.css';

interface UserFormProps {
    doSignUp: (user: UserInput, organisation: string) => void;
    loading: boolean;
    error?: string;
}

/*
 * UserFrom presentation component: Show content & do validation
*/
function UserForm({ doSignUp, loading, error }: UserFormProps) {

    const [user, setUser] = useState<UserInput>({} as UserInput);
    const [organisation, setOrganisation] = useState<string>('');

    const handleSubmit = () => {
        if(!user.firstName || !user.lastName || !user.email || !organisation){
            alert('missing required information');
            return;
        }
        doSignUp(user, organisation)
    }
    
    if(loading) {
        return <div className='signup-waiting'>Signing up {user.firstName} to {organisation}, please waiting...</div>
    }

    error && alert(error);

    return (
        <div className='userform-container'>
            
            <div className='userform-row'>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    type='text'
                    placeholder="First Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        user.firstName = e.target.value;
                        setUser(user);
                    }}
                />
            </div>
            <div className='userform-row'>
                <label htmlFor='lastName'>Last Name</label>
                <input type='text'
                    placeholder="Last Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        user.lastName = e.target.value;
                        setUser(user);
                    }}
                />
            </div>
            <div className='userform-row'>
                <label htmlFor='email'>Email</label>
                <input type='text'
                    placeholder="Email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        user.email = e.target.value;
                        setUser(user);
                    }} />
            </div>
            <div className='userform-row'>
                <label htmlFor='organisation'>Organisation</label>
                <input type='text'
                    placeholder="Organisation"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setOrganisation(e.target.value);
                    }} />
            </div>
            <div className='userform-row'>
                <button className='userform-start' onClick={handleSubmit}>Start</button>
            </div>
        </div>
    );
}

export default UserForm;
