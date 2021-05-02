import { createContext, FC, useContext } from 'react';
import { RootStore } from './RootStore';

const StoreContext = createContext<RootStore>(new RootStore());

const StoreProvider: FC<{store: RootStore}> = ({store, children}) => {
    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    );
};

const useStore = () => {
    return useContext(StoreContext);
}

const useApplicationStore = () => {
    const { applicationStore } = useStore();
    return applicationStore;
}

const useBoardStore = () => {
    const { boardStore } = useStore();
    return boardStore;
}

const store = new RootStore();
export { store, StoreProvider, useStore, useApplicationStore, useBoardStore}