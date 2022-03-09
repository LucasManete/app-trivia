import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/gamePage" render={ (props) => <GamePage { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </div>
  );
}
