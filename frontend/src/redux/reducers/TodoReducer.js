function TodoReducer(state = { todos: []}, action) {
  switch (action.type) {
    case "setTodos":
      return {
        todos: action.payload.todos,
      };
    default:
      return state;
  }
}

export default TodoReducer;