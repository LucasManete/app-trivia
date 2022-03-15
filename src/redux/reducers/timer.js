export const INITIAL_STATE = {
  stop: false,
  time: 3,
  render: true,
};

function timeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'STOP_TIME':
    return { ...state,
      stop: action.state };
  case 'SET_TIME':
    return { ...state,
      time: action.state };
  case 'RENDER_TIME':
    return { ...state,
      render: action.state };
  default:
    return state;
  }
}
export default timeReducer;
