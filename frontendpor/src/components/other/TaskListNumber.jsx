import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex mt-10 justify-between gap-5 screen '>
      <div className=' rounded-2xl w-[45%]  py-6 px-10  bg-red-400' >
            <h2 className='text-3xl font-semibold'>0</h2>

            <h3 className='text-xl font-medium'>New Task</h3>
      </div>
       <div className=' rounded-2xl w-[45%]  py-6 px-10  bg-blue-400' >
            <h2 className='text-3xl font-semibold'>1</h2>

            <h3 className='text-xl font-medium'>New Task</h3>
      </div>
       <div className=' rounded-2xl w-[45%]  py-6 px-10  bg-green-400' >
            <h2 className='text-3xl font-semibold'>2</h2>

            <h3 className='text-xl font-medium'>New Task</h3>
      </div>
       <div className=' rounded-2xl w-[45%]  py-6 px-10  bg-yellow-400' >
            <h2 className='text-3xl font-semibold'>3</h2>

            <h3 className='text-xl font-medium'>New Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber