import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '@/models/ITodo';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

interface ITodoState {
  todos: ITodo[];
}

const initialState: ITodoState = {
  todos: [
    {
      id: uuid(),
      title: 'First todo',
      description: 'Learn JS',
      dueDate: '5/27/2023',
      completed: false,
    },
    {
      id: uuid(),
      title: 'Second todo',
      description: 'Workout',
      dueDate: '6/10/2023',
      completed: false,
    },
    {
      id: uuid(),
      title: 'Third todo',
      description: 'Go for a walk',
      dueDate: '5/22/2023',
      completed: false,
    },
    {
      id: uuid(),
      title: 'Fourth todo',
      description: 'Do something',
      dueDate: '5/20/2024',
      completed: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    finishTodo(state, action: PayloadAction<string>) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos[index].completed = true;
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    sortTodos(state, action: PayloadAction<string>) {
      if (action.payload !== 'dueDate') {
        state.todos.sort((a: any, b: any) =>
          a[action.payload].localeCompare(b[action.payload])
        );
      } else {
        state.todos.sort(
          (a, b) =>
            //@ts-ignore
            dayjs(a[action.payload]) - dayjs(b[action.payload])
        );
      }
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, removeTodo, finishTodo, editTodo, sortTodos } =
  todoSlice.actions;
