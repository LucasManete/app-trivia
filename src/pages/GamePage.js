import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class GamePage extends React.Component {
  render() {
    const { name, email } = this.props;
    const imageUser = md5(email).toString();
    return (
      <div className="game-pag">
        <header className="game-header">
          <img
            src={ `https://www.gravatar.com/avatar/${imageUser}` }
            alt="UserImage"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{name}</h3>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  // score: state.player.score,
});
GamePage.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(GamePage);
