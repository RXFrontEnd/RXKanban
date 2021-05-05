import { useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Ticket from './pages/Ticket';
import { GET_APP_STATE } from './operations/queries/appState';
import { LocalQueries } from './models/locatType';

function App() {
  const { loading, data} = useQuery<LocalQueries>(GET_APP_STATE);
  
  return (
    <div className="App">
      {
        loading ? 'loading' 
        : data?.appState.isSignedUp() ? (data?.appState.currentBoardId ? <Ticket /> 
        : <Board />)
        : <SignUp />
      }
    </div>
  );
  
}

export default App;
