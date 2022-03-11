import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  // message=() => {
  //   const numQuestions = 3;
  //   if(assertions<numQuestions) {
  //     return (<p data-testid="feedback-text">Could be better...</p>)
  //   }
  //   else
  //   return (<p data-testid="feedback-text">Well Done!</p>)
  // }

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

          {
            (assertions < numQuestions)
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p>
          }
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

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  imgGravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);
