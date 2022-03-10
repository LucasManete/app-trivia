import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';

class GamePage extends React.Component {
  render() {
    const { name, urlGravatar } = this.props;
    return (
      <div className="game-pag">
        <header className="game-header">
          <img
            src={ `${urlGravatar}` }
            alt="UserImage"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{name}</h3>
          <p data-testid="header-score">0</p>
        </header>
        <section className="Questions-section">
          <Questions />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  urlGravatar: state.player.gravatarEmail,
  // score: state.player.score,
});
GamePage.propTypes = {
  name: PropTypes.string.isRequired,
  urlGravatar: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(GamePage);
