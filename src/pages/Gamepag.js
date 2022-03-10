import React from 'react';
// import { Route, Switch } from 'react-router-dom';

class Gamepag extends React.Component() {
  render() {
    return (
      <div className="game-pag">
        <header className="game-header">
          <img
            src={ logo }
            className="App-logo"
            alt="logo"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">Nome da Pessoa</h3>
          <p>Placar Zerado</p>
        </header>
      </div>
    );
  }
}

export default Gamepag;
