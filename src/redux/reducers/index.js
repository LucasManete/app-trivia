import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import timer from './timer';
import answer from './answer';

const reducer = combineReducers({ player, token, timer, answer });

export default reducer;
