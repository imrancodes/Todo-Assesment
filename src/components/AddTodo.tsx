import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { createTodo } from '../redux/slices/todo/todoSlice';

const AddTodo = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<string>('');

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createTodo(input))
        setInput('')
    }

    return (
        <div className="mt-10 border-1 rounded dark:border-gray-700 border-gray-300 mb-6">
            <form onSubmit={addTodo}>
                <div className="dark:bg-[#25273C] w-full text-xl p-4 rounded shadow-lg outline-0 flex justify-between gap-2">
                    <input
                        type="text"
                        value={input}
                        className="outline-0 w-full"
                        placeholder="Create New Todo"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={`cursor-pointer flex items-center gap-1 dark:bg-[#4d5066] text-white bg-gray-400 px-2 py-1 rounded text-sm ${input ? 'block' : 'hidden'}`}
                        >
                        <FaPlus className="text-sm" /> Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;
