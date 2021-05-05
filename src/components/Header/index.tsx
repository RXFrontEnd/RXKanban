import React from 'react';
import './index.css';

import {appStateVar} from '../../apollo/cache'
import { AppState } from '../../models/AppState';

export type HeaderProps = {
    title: string;
    userName?: string;
}

function Header(props: HeaderProps) {
    const handleClick = () => {
        appStateVar({isSignedUp: function(){ return !!this.userId && !! this.orgId}} as AppState);
    }
    return (
        <div className='header-container'>
            <h1>{props.title}</h1>
            <div>
                <span className='header-user-name'>{props.userName}</span>
                {!!props.userName ? <button onClick={handleClick}>Sign Out</button> : ''}
            </div>
        </div>
    )
}

export default Header
