import { FaCheck } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa6';
import type { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';

import {
    updateTodo,
    deleteTodo,
    completeTodo,
    loadTodoFromStorage,
} from '../redux/slices/todo/todoSlice';

type Filter = 'all' | 'completed' | 'incomplete';

const Todos = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();
    const [editText, setEditText] = useState<string>('');
    const [editableId, setEditableId] = useState('');
    const [filter, setFilter] = useState<Filter>('all');

    const filterTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    useEffect(() => {
        const todosFromStorage = JSON.parse(
            localStorage.getItem('todos') || '[]'
        );
        if (todosFromStorage.length > 0) {
            dispatch(loadTodoFromStorage(todosFromStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleEdit = (todoId: string, todoText: string) => {
        if (editableId === todoId) {
            dispatch(updateTodo({ id: todoId, newText: editText }));
            setEditableId('');
            setEditText('');
        } else {
            setEditableId(todoId);
            setEditText(todoText);
        }
    };

    return (
        <>
            <div className="border-1 dark:border-gray-700 border-gray-300 rounded shadow-lg">
                {filterTodos.map((todo) => (
                    <div
                        className="dark:bg-[#25273C] w-full text-xl p-4 rounded border-b-1 dark:border-gray-700 border-gray-300"
                        key={todo.id}>
                        <div className="flex gap-4 items-center justify-between">
                            <div
                                className={`size-6 border-1 border-gray-500 cursor-pointer rounded-full text-[14px] flex items-center justify-center ${
                                    todo.completed
                                        ? 'bg-[#99999c]'
                                        : 'bg-transparent'
                                } `}
                                onClick={() => dispatch(completeTodo(todo.id))}>
                                {todo.completed ? (
                                    <FaCheck className="text-white" />
                                ) : null}
                            </div>
                            <textarea
                                className={`w-full outline-0 flex-1 break-all h-[28px]  ${
                                    todo.completed
                                        ? 'text-gray-400 line-through dark:text-[#4d4f64]'
                                        : ''
                                }`}
                                value={
                                    todo.id === editableId
                                        ? editText
                                        : todo.todo
                                }
                                disabled={todo.id !== editableId}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className="flex items-center gap-3 text-white">
                                <button
                                    className={`${
                                        todo.completed
                                            ? 'cursor-not-allowed'
                                            : 'cursor-pointer'
                                    } ${
                                        todo.id === editableId
                                            ? 'bg-amber-400'
                                            : 'bg-green-500'
                                    }  p-1 rounded`}
                                    disabled={todo.completed}
                                    onClick={() => {
                                        handleEdit(todo.id, todo.todo);
                                    }}>
                                    {todo.id === editableId ? (
                                        <FaSave />
                                    ) : (
                                        <MdEdit />
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(deleteTodo(todo.id))
                                    }
                                    className="cursor-pointer bg-red-500 p-1 rounded">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm pt-2 flex items-center gap-2 pl-10 text-[#777a7c]">
                            <FaRegClock />
                            <span>
                                {todo.createdAtDate} at {todo.createdAtTime}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            <div className="dark:bg-[#25273C] w-full text-xl p-4 rounded shadow-lg border-1 dark:border-gray-700 border-gray-300 mt-6 flex items-center justify-around gap-3 font-semibold">
                <button
                    className={`cursor-pointer text-[16px] ${filter === 'all' ? 'text-blue-600' : 'text-[#777a7c] dark:hover:text-white hover:text-black'}`}
                    onClick={() => setFilter('all')}>
                    All
                </button>
                <button
                    className={`cursor-pointer text-[16px] ${filter === 'completed' ? 'text-blue-600' : 'text-[#777a7c] dark:hover:text-white hover:text-black'}`}
                    onClick={() => setFilter('completed')}>
                    Completed
                </button>
                <button
                    className={`cursor-pointer text-[16px] ${filter === 'incomplete' ? 'text-blue-600' : 'text-[#777a7c] dark:hover:text-white hover:text-black'}`}
                    onClick={() => setFilter('incomplete')}>
                    Incomplete
                </button>
            </div>
        </>
    );
};

export default Todos;
