import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import todo from './todo'

const reducer = combineReducers({
  routing: routerReducer,
  todo
});

export default reducer;
