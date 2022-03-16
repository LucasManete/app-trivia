// import React from 'react';
import PropTypes from 'prop-types';
import { stopTimer, answerDisabled, nextBtn, countScore } from '../redux/actions';
import { getLocalStorage } from './localStorage';

export const checkScore = (informations) => {
  const { index,
    questions,
    score,
    assertions,
    countScoreAction } = informations;
  const POINTS = 10;
  const EASY = 1;
  const MEDIUM = 2;
  const HARD = 3;
  const timerStorage = getLocalStorage('timer');
  const { results } = questions;
  const { difficulty } = results[index];
  if (difficulty === 'easy') {
    const totalScore = score + POINTS + (timerStorage * EASY);
    // saveRankingStorage({ name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
  if (difficulty === 'medium') {
    const totalScore = score + POINTS + (timerStorage * MEDIUM);
    // saveRankingStorage({ name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
  if (difficulty === 'hard') {
    const totalScore = score + POINTS + (timerStorage * HARD);
    // saveRankingStorage({ name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
};

export const propTypes = {
  questions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setDisabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stopTimerAction: PropTypes.func.isRequired,
  setNext: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  countScoreAction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  urlGravatar: PropTypes.string.isRequired,

};

export const mapStateToProps = (state) => ({
  questions: state.player.questions,
  disabled: state.answer.disabled,
  next: state.answer.nextBtn,
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  urlGravatar: state.player.gravatarEmail,
});

export const mapDispatchToProps = (dispatch) => ({
  stopTimerAction: (state) => dispatch(stopTimer(state)),
  setDisabled: (state) => dispatch(answerDisabled(state)),
  setNext: (state) => dispatch(nextBtn(state)),
  countScoreAction: (state) => dispatch(countScore(state)),
});
