import AddTodo from './components/AddTodo';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from "react-icons/fa6";
import Todos from './components/Todos';
// import TodoFilter from './components/TodoFilter';
import { useEffect, useState } from 'react';

const App = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const themeHandler = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    useEffect(() => {
        const mode = document.querySelector('html');
        mode?.classList.remove('dark', 'light');
        mode?.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className=" max-w-3xl px-6 m-auto pt-16 pb-8">
            <div className="flex justify-between items-center text-2xl font-sans ">
                <h1 className="font-bold">T O D O' S</h1>
                <div className="cursor-pointer" onClick={themeHandler}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </div>
            </div>
            <AddTodo />
            <Todos />
        </div>
    );
};

export default App;
