// every query from store of redux will be implemented here
export const getTodo = (state) => {
  return state.todo.get('todo', []);
}

export const getInProgress = (state) => {
  return state.todo.get('progress', []);
}

export const getDone = (state) => {
  return state.todo.get('done', []);
}
