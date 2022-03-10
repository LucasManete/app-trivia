export const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
}
export default playerReducer;
