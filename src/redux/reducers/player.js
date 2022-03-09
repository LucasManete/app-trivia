export const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return { ...state,
      email: action.state };
  default:
    return state;
  }
}
export default playerReducer;
