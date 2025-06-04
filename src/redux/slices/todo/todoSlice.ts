import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
    id: string;
    todo: string;
    completed: boolean;
    createdAtDate: string;
    createdAtTime: string;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const currentDate = new Date()
    .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
    .replace(',', '');

const currentTime = new Date().toLocaleTimeString('en', { timeStyle: 'short' });

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createTodo: (state, action: PayloadAction<string>) => {
            const todo = {
                id: nanoid(),
                todo: action.payload,
                completed: false,
                createdAtDate: currentDate,
                createdAtTime: currentTime,
            };
            state.todos.push(todo);
        },
        completeTodo: (state, action: PayloadAction<string>) => {
            state.todos.forEach((todo) => {
                if(todo.id === action.payload){
                    todo.completed = !todo.completed
                }
            } )
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        updateTodo: (
            state,
            action: PayloadAction<{ id: string; newText: string }>
        ) => {
            state.todos.forEach((todo) => {
                if (todo.id === action.payload.id) {
                    todo.todo = action.payload.newText;
                }
            });
        },
        loadTodoFromStorage: (state, action) => {
            state.todos = action.payload
        }
    },
});

export const { createTodo, completeTodo, deleteTodo, updateTodo, loadTodoFromStorage } = todoSlice.actions;

export default todoSlice.reducer;
