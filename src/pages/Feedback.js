import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetScore } from '../redux/actions';
// import { saveRankingStorage } from '../services/localStorage';

class Feedback extends React.Component {
  resetScoreFeedback = () => {
    const { resetScoreAction } = this.props;
    resetScoreAction({ score: 0 });
  };

  render() {
    const numQuestions = 3;
    const { imgGravatar, userName, score, assertions } = this.props;
    return (
      <>
        <header>
          <img
            src={ `${imgGravatar}` }
            alt="userImage"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <section>
          {/* <h2 data-testid="feedback-text">
            { assertions < numQuestions ? 'Could be better...' : 'Well Done!'}
          </h2> */}
          {
            (assertions < numQuestions)
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
          <p>Placar Final</p>
          <p data-testid="feedback-total-score">
            { score }
            {console.log(score)}
          </p>
          <p>Você acertou:</p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
          <Link to="/">
            <button
              type="submit"
              data-testid="btn-play-again"
              onClick={ this.resetScoreFeedback }
            >
              Play Again

            </button>
          </Link>
          <Link to="/ranking">
            <button type="submit" data-testid="btn-ranking">Ranking</button>
          </Link>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  imgGravatar: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreAction: (score) => dispatch(resetScore(score)),
});

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  imgGravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  resetScoreAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
