import React from 'react';
import './index.css';

import {appStateVar} from '../../apollo/cache'
import { AppState } from '../../models/localType';

export type HeaderProps = {
    title: string;
    userName?: string;
    handleClick?: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}

function Header(props: HeaderProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        appStateVar({
            userId:'',
            orgId:'',
            currentBoardId:'',
            currentBoardName:'',
            isSignedUp: function(){ return !!this.userId && !! this.orgId}} as AppState
        );
    }
    return (
        <div className='header-container' >
            <h1 onClick={props.handleClick}>{props.title}</h1>
            <div>
                <span className='header-user-name'>{props.userName}</span>
                {!!props.userName ? <button onClick={handleClick}>Sign Out</button> : ''}
            </div>
        </div>
    )
}

export default Header
