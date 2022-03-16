import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetScore } from '../redux/actions';
import './feedback.css';
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
      <div className="feedbackPage">
        <header className="feedback-header">
          {/* esse header poderia ser um componente */}
          <img
            src={ `${imgGravatar}` }
            alt="userImage"
            data-testid="header-profile-picture"
            className="userImg"
          />
          <p data-testid="header-player-name" className="userName">{ userName }</p>
          <p data-testid="header-score" className="userScore">{ score }</p>
        </header>
        <section className="feedback-section">
          {
            (assertions < numQuestions)
              ? <p data-testid="feedback-text" className="feedText">Could be better...</p>
              : <p data-testid="feedback-text" className="feedText">Well Done!</p>
          }
          <p>Placar Final:</p>
          <p
            data-testid="feedback-total-score"
            className="feedbackNumber"
          >
            { score }
          </p>
          <p>Você acertou:</p>
          <p
            data-testid="feedback-total-question"
            className="feedbackNumber"
          >
            {assertions}
          </p>
          <Link to="/">
            <button
              type="submit"
              data-testid="btn-play-again"
              className="feedbackBtn"
              onClick={ this.resetScoreFeedback }
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="submit"
              data-testid="btn-ranking"
              className="feedbackBtn"
            >
              Ranking

            </button>
          </Link>
        </section>
      </div>
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
