export const INITIAL_STATE = {
  disabled: false,
  nextBtn: false,
};

function answerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ANSWER_DISABLED':
    return { ...state,
      disabled: action.state };
  case 'CHANGE_NEXT':
    return { ...state,
      nextBtn: action.state };
  default:
    return state;
  }
}
export default answerReducer;
