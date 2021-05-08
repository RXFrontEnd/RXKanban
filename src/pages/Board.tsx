import { appStateVar } from '../apollo/cache';
import Header from '../components/Header';
import BoardPanel from '../containers/BoardPanel'

function Board() {
    const appState = appStateVar();

    return (
        <>
            <Header 
                title={appState.orgName.concat(' - Board')} 
                userName={appState.userName} />
            <BoardPanel organisation={appState.orgId}/>
        </>
    )
}

export default Board;
