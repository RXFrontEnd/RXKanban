import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';

export class BoardStore {
    private root: RootStore;
 

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }
    
}