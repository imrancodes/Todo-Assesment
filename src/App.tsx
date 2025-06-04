import AddTodo from './components/AddTodo';
import { FaSun } from 'react-icons/fa';
import Todos from './components/Todos';
import TodoFilter from './components/TodoFilter';

const App = () => {
    return (
        // <div className="transform absolute top-[50%] left-[50%] -translate-[50%] w-full px-6">
        <div className=" max-w-3xl px-6 m-auto pt-16 pb-8">
            <div className="flex justify-between items-center text-2xl font-sans ">
                <h1 className="font-bold">T O D O' S</h1>
                <FaSun className="cursor-pointer" />
            </div>
            <AddTodo />
            <div className='border-1 dark:border-gray-700 border-gray-300 rounded shadow-lg'>
                <Todos />
            </div>
            <TodoFilter />
        </div>
    );
};

export default App;
