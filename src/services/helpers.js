// import { connect } from 'react-redux';
// import { countScore } from '../redux/actions';
import { getLocalStorage, saveLocalStorage } from './localStorage';

export const checkScore = (informations) => {
  const { index,
    questions,
    score,
    assertions,
    countScoreAction,
    name,
    urlGravatar } = informations;

  const POINTS = 10;
  const EASY = 1;
  const MEDIUM = 2;
  const HARD = 3;
  const timerStorage = getLocalStorage('timer');
  const { results } = questions;
  const { difficulty } = results[index];
  if (difficulty === 'easy') {
    const totalScore = score + POINTS + (timerStorage * EASY);
    saveLocalStorage('ranking', { name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
  if (difficulty === 'medium') {
    const totalScore = score + POINTS + (timerStorage * MEDIUM);
    saveLocalStorage('ranking', { name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
  if (difficulty === 'hard') {
    const totalScore = score + POINTS + (timerStorage * HARD);
    saveLocalStorage('ranking', { name, score: totalScore, picture: urlGravatar });
    return countScoreAction({ score: totalScore, assertions: assertions + 1 });
  }
};

// const mapStateToProps = (state) => ({
//   score: state.player.score,
//   assertions: state.player.assertions,
// });

// const mapDispatchToProps = (dispatch) => ({
//   countScoreAction: (state) => dispatch(countScore(state)),
// });

export default (checkScore);
