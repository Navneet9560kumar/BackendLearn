import React from 'react'

const TaskListNumber = ({ data }) => {
  return (
    <div className='flex mt-10 flex-wrap justify-between gap-5'>
      
      <div className='rounded-2xl w-[45%] py-6 px-10 bg-gradient-to-r from-[#ff7b7b] to-[#ff4d4d] text-white'>
        <h2 className='text-3xl font-semibold'>{data?.taskCounts?.newTask ?? 0}</h2>
        <h3 className='text-xl font-medium'>New Tasks</h3>
      </div>

      <div className='rounded-2xl w-[45%] py-6 px-10 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white'>
        <h2 className='text-3xl font-semibold'>{data?.taskCounts?.active ?? 0}</h2>
        <h3 className='text-xl font-medium'>Active Tasks</h3>
      </div>

      <div className='rounded-2xl w-[45%] py-6 px-10 bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-white'>
        <h2 className='text-3xl font-semibold'>{data?.taskCounts?.completed ?? 0}</h2>
        <h3 className='text-xl font-medium'>Completed</h3>
      </div>

      <div className='rounded-2xl w-[45%] py-6 px-10 bg-gradient-to-r from-[#fa709a] to-[#fee140] text-white'>
        <h2 className='text-3xl font-semibold'>{data?.taskCounts?.failed ?? 0}</h2>
        <h3 className='text-xl font-medium'>Failed</h3>
      </div>

    </div>
  )
}

export default TaskListNumber
