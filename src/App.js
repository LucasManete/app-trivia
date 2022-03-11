import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/gamePage" render={ (props) => <GamePage { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
