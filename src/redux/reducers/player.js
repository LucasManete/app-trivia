import { USER_INFORMATIONS } from '../actions';

export const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFORMATIONS:
    return action.state;
  default:
    return state;
  }
}
export default playerReducer;
