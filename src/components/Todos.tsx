import { FaCheck } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa6';
import type { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateTodo } from '../redux/slices/todo/todoSlice';

const Todos = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <>
            {todos.map((todo) => (
                <div
                    className="dark:bg-[#25273C] w-full text-xl p-4 rounded border-b-1 dark:border-gray-700 border-gray-300"
                    key={todo.id}>
                    <div className="flex gap-4 items-center justify-between">
                        <div className="size-6 border-1 border-gray-500 cursor-pointer rounded-full text-[14px] flex items-center justify-center bg-[#99999c]">
                            <FaCheck className="text-white" />
                        </div>
                        <textarea
                            className="w-full outline-0 flex-1 break-all h-[28px] dark:text-[#4d4f64] text-gray-400 line-through"
                            value={todo.todo}
                            readOnly={!todo.completed}
                        />
                        <div className="flex items-center gap-3 text-white">
                            <button className="cursor-pointer bg-green-500 p-1 rounded">
                                <MdEdit />
                            </button>
                            <button className="cursor-pointer bg-red-500 p-1 rounded">
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
        </>
    );
};

export default Todos;
