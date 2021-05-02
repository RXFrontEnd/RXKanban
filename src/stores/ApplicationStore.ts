import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';

/**
 * ApplicationStore
 * Store Application state, determine what domain should be shown in the current state.
 */
export class ApplicationStore {
    
    userId: string = '';
    organisationId: string = '';

    constructor(root: RootStore){
        makeAutoObservable(this);
    }

    get isSignUp() : boolean{
        return this.userId === '' 
                || this.organisationId === '';
    }
}