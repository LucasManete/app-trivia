export const USER_TOKEN = 'USER_TOKEN';
export const login = (state) => ({ type: USER_TOKEN, state });
export const getPlayer = (state) => ({ type: 'GET_PLAYER', state });

export function fetchQuestionsApi(state) {
  return (dispatch) => {
    dispatch(login(state.token));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${state.token}`).then((response) => response.json())
      .then((data) => dispatch(getPlayer({ questions: data,
        name: state.userName,
        gravatar: state.gravatar,
      })));
  };
}
