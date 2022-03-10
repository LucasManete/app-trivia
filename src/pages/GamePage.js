import React from 'react';
import Questions from '../components/Questions';

class GamePage extends React.Component {
  render() {
    return (
      <div className="game-pag">
        <header className="game-header">
          <img
            className="App-logo"
            alt="logo"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">Nome da Pessoa</h3>
          <p>Placar Zerado</p>
        </header>
        <section className="Questions-section">
          <Questions />
        </section>
      </div>
    );
  }
}

export default GamePage;
