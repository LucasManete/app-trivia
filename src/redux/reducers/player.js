export const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_PLAYER':
    return { ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatar,
      questions: action.state.questions };
  case 'SET_SCORE':
    return { ...state, score: action.state.score, assertions: action.state.assertions };
  case 'RESET_SCORE':
    return { score: 0, assertions: 0, gravatarEmail: '', questions: '', name: '' };
  default:
    return state;
  }
}
export default playerReducer;
