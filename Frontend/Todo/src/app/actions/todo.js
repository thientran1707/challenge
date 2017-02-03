import { ADD_TODO, PUSH_CARD, REMOVE_CARD, MOVE_CARD } from './action_types';
import action from './action_util';

export function addTodo(text) {
  return dispatch => {
    dispatch(action(ADD_TODO, { text }));
  }
}

export function pushCard(containerId, card) {
  return dispatch => {
    dispatch(action(PUSH_CARD, { containerId, card }));
  }
}

export function removeCard(containerId, index) {
  return dispatch => {
    dispatch(action(REMOVE_CARD, { containerId, index }));
  }
}

export function moveCard(containerId, dragIndex, hoverIndex, dragCard) {
  return dispatch => {
    dispatch(action(MOVE_CARD, { containerId, dragIndex, hoverIndex, dragCard }));
  }
}
