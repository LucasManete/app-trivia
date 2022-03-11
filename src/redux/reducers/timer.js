export const INITIAL_STATE = {
  stop: false,
  time: 3,
};

function timeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'STOP_TIME':
    return { ...state,
      stop: action.state };
  case 'SET_TIME':
    return { ...state,
      time: action.state };
  default:
    return state;
  }
}
export default timeReducer;
