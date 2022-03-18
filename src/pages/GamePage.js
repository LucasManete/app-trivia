import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import './gamePage.css';

class GamePage extends React.Component {
  render() {
    const { name, urlGravatar, history, score } = this.props;
    return (
      <div className="game-pag">
        <header className="game-header">
          <img
            src={ urlGravatar }
            d="identicon"
            alt="UserImage"
            data-testid="header-profile-picture"
            className="user-Image"
          />
          <h3 data-testid="header-player-name" className="playerName">{name}</h3>
          <p data-testid="header-score" className="playerScore">{score}</p>
        </header>
        <section className="questions-section">
          <Questions history={ history } />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  urlGravatar: state.player.gravatarEmail,
  score: state.player.score,
});
GamePage.propTypes = {
  name: PropTypes.string.isRequired,
  urlGravatar: PropTypes.string.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(GamePage);
