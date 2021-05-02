import React from 'react';
import './App.css';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import { useApplicationStore } from './stores';


function App() {
  const appState = useApplicationStore();
  
  return (
    <div className="App">
      {appState.isSignUp ? <SignUp /> : <Board />}
      
    </div>
  );
}

export default App;
