import { BoardStore } from './BoardStore';
import { ApplicationStore } from './ApplicationStore';

export class RootStore {
    applicationStore: ApplicationStore;
    boardStore: BoardStore;

    constructor(){
        this.applicationStore = new ApplicationStore(this);
        this.boardStore = new BoardStore(this);
        
    }
}