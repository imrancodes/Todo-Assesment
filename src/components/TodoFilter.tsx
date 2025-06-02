import React from 'react'

const TodoFilter = () => {
  return (
    <div className='dark:bg-[#25273C] w-full text-xl p-4 rounded shadow-lg border-1 dark:border-gray-700 border-gray-300 mt-6 flex items-center justify-around gap-3 font-semibold'>
        <button className='cursor-pointer text-[16px] text-[#777a7c] dark:hover:text-white hover:text-black'>All</button>
        <button className='cursor-pointer text-[16px] text-[#777a7c] dark:hover:text-white hover:text-black'>Completed</button>
        <button className='cursor-pointer text-[16px] text-[#777a7c] dark:hover:text-white hover:text-black'>Incomplete</button>
    </div>
  )
}

export default TodoFilter