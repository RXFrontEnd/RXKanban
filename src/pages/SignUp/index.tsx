import React, { useState } from 'react';
import './index.css';
import { useCreateUser } from '../../operations/mutations/createUser';
import { useRegisterOrganisation } from '../../operations/mutations/registerOrganisation';
import { UserInput } from '../../models/type';
import Header from '../../components/Header'

function SignUp() {
    const [user, setUser] = useState<UserInput>({} as UserInput);
    const [organisation, setOrganisation] = useState<string>('');
    const {createUser, userLoading, userError} = useCreateUser();
    const { registerOrganisation, organisationLoading, organisationError  } = useRegisterOrganisation();

    const handleClick = async () => {
        const userData = await createUser({
            variables: {
                user
            }
        });
        if(userData.data){
            await registerOrganisation({
                variables:{
                    name: organisation,
                    timezone: 'Pacific/Auckland'
                }
            });
        }
        
    }
    // if(error){
    //     console.log(error);
    // }
    if(userLoading || organisationLoading) {
        return <div>Signing up {user.firstName}, please waiting...</div>
    }

    return (
        <>
        <Header title='RXTicket - Sign Up'/>
        <div className='signup-container'>
            
                <div className='row'>
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
                <div className='row'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text'
                        placeholder="Last Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            user.lastName = e.target.value;
                            setUser(user);
                        }}
                     />
                </div>
                <div className='row'>
                    <label htmlFor='email'>Email</label>
                    <input type='text'
                        placeholder="Email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            user.email = e.target.value;
                            setUser(user);
                        }} />
                </div>
                <div className='row'>
                    <label htmlFor='organisation'>Organisation</label>
                    <input type='text'
                        placeholder="Organisation"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOrganisation(e.target.value);
                        }} />
                </div>
                <div className='row'>
                    <button className='start' onClick={handleClick}>Start</button>
                </div>
        </div>
        </>
        
    )
}

export default SignUp
