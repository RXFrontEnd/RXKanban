import React, { useState } from 'react';
import './index.css';
import { useCreateUser } from '../../operations/mutations/createUser';
import { useRegisterOrganisation } from '../../operations/mutations/registerOrganisation';
import { UserInput } from '../../models/type';
import Header from '../../components/Header'
import { appStateVar } from '../../apollo/cache';
import { AppState } from '../../models/locatType';
import { generateKey } from '../../apollo';

function SignUp() {
    const [user, setUser] = useState<UserInput>({} as UserInput);
    const [organisation, setOrganisation] = useState<string>('');
    const {createUser, userLoading, userError} = useCreateUser();
    const { registerOrganisation, organisationLoading, organisationError  } = useRegisterOrganisation();

    const handleClick = async () => {
        let userData = null;
        const id = localStorage.getItem(generateKey(user.email));
        if(id){
            const curState = appStateVar();
            userData = appStateVar({
                ...curState,
                userId: id,
                userName: user.firstName.concat(user.lastName)
            } as AppState);
        }else {
            const result = await createUser({
                variables: {
                    user
                }
            });
            userData = result.data;
        }
        if(userData){
            const curState = appStateVar();
            const oId = localStorage.getItem(generateKey(user.email.concat(organisation)));
            if(oId){
                appStateVar({
                    ...curState,
                    orgId: oId,
                    orgName: organisation
                })
            }else{
                await registerOrganisation({
                    variables:{
                        name: organisation,
                        timezone: 'Pacific/Auckland'
                    }
                });
            }
            
        }
        
    }
    userError && alert(userError.message);
    organisationError && alert(organisationError.message);
    if(userLoading || organisationLoading) {
        return <div className='signup-waiting'>Signing up {user.firstName} to {organisation}, please waiting...</div>
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
