import { Map } from 'immutable';
import * as actionTypes from '../actions/action_types';
//import update from 'react/lib/update';

const initialState = Map({ 
  todo: [],
  progress: [],
  done: []
});

export default function account(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TODO: {
      const { text } = action;
      const todos = state.get('todo');
      return state.set('todo', [...todos, { text }]);
    }

    case actionTypes.PUSH_CARD: {
      const { containerId, card } = action;
      const todos = state.get(containerId);
      return state.set(containerId, [...todos, card]);
    }

    case actionTypes.REMOVE_CARD: {
      const { containerId, index } = action;
      const todos = [...state.get(containerId)];
      todos.splice(index, 1);
      return state.set(containerId, todos);
    }

    case actionTypes.MOVE_CARD: {
      const { containerId, dragIndex, hoverIndex, dragCard} = action;
      const todos = [...state.get(containerId)];
      todos.splice(dragIndex, 1)
      todos.splice(hoverIndex, 0, dragCard);
      
      return state.set(containerId, todos);
    }

    default:
      return state;
  }
}