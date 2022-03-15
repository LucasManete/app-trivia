import { saveLocalStorage } from '../../services/localStorage';

export const USER_TOKEN = 'USER_TOKEN';
export const login = (state) => ({ type: USER_TOKEN, state });
export const getPlayer = (state) => ({ type: 'GET_PLAYER', state });
export const stopTimer = (state) => ({ type: 'STOP_TIME', state });
export const answerDisabled = (state) => ({ type: 'ANSWER_DISABLED', state });
export const nextBtn = (state) => ({ type: 'CHANGE_NEXT', state });
export const setTime = (state) => ({ type: 'SET_TIME', state });
export const countScore = (state) => ({ type: 'SET_SCORE', state });
export const resetScore = (state) => ({ type: 'RESET_SCORE', state });
const fetchTokenApi = async () => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const token = await response.json();
    saveLocalStorage('token', token);
    return token.token;
  } catch (error) {
    return error;
  }
};

export function fetchQuestionsApi(state) {
  return async (dispatch) => {
    const token = await fetchTokenApi();
    dispatch(login(token));
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      const wrongCode = 3;
      if (data.response_code === wrongCode) {
        throw new Error();
      }
      return dispatch(getPlayer({ questions: data,
        name: state.userName,
        gravatar: state.gravatar,
      }));
    } catch (error) {
      console.log('lalala');
      const newToken = await fetchTokenApi();
      const requestQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
      const questions = await requestQuestions.json();
      return dispatch(getPlayer({ questions,
        name: state.userName,
        gravatar: state.gravatar,
      }));
    }
  };
}
