import { useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import { GET_APP_STATE } from './operations/queries/appState';
import { LocalQueries } from './models/AppState';

function App() {
  const { loading, data} = useQuery<LocalQueries>(GET_APP_STATE);
  
  return (
    <div className="App">
      {console.log(data)}
      {loading ? 'loading' : data?.appState.isSignedUp() ? <Board /> : <SignUp />}
    </div>
  );
  
}

export default App;
