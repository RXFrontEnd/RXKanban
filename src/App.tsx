import { useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Ticket from './pages/Ticket';
import { GET_APP_STATE } from './operations/queries/appState';
import { LocalQueries } from './models/locatType';

function App() {
  const { loading, error, data} = useQuery<LocalQueries>(GET_APP_STATE);

  let content = '';
  let page = <SignUp />
  if(loading){
    content = 'Loading';
  }else if(error){
    content = 'Error, please restart your application';
  }else{
    if(data){
      const {appState} = data;
      console.log(appState)
      if(appState.isSignedUp()) {
        page = appState.currentBoardId ? <Ticket /> : <Board />;
      }
    }
  }
  
  
  
  return (
    <div className="App">
      { content || page }
    </div>
  );
  
}

export default App;
