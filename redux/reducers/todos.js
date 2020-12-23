import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actionTypes";

const initialState = {
  todo_list: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task } = action.payload
      if (task.length > 0) {
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task }]
      };
    }
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }

    case UPDATE_TODO: {
      const { id,task } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.map((todo) =>
          todo.id === id ?
            { id: todo.id, task: task } :
            todo
        )
      };
    }
    default:
      return state;
  }
}
