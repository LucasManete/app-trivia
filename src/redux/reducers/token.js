import { USER_TOKEN } from '../actions/index';

export const INITIAL_STATE = '';

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_TOKEN:
    return action.state;
  default:
    return state;
  }
}
export default tokenReducer;
