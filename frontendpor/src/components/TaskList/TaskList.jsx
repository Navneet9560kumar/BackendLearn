import React from 'react'

const TaskList = () => {
  return (
    <div id='Tasklist' className="h-[55%] w-full overflow-x-auto flex gap-5 py-5  mt-10">
      <div className="h-full w-[300px] p-5 bg-yellow-400 rounded-xl flex-shrink-0">
            <div className='flex justify-between items-center'>
                  <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>High</h3>
                  <h4 className='text-sm'>20 feb 2014</h4>

            </div>
            <h2 className='mt-5 text-xl font-semibold'>Make a youtube viedo</h2>
            <p className='text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum laborum possimus eligendi error. In distinctio ipsam quidem facilis quas animi nesciunt ab tempora repellendus, magnam minima? Accusamus dolor magnam adipisci. </p>

      </div>
      {/* <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">2</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">3</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">4</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">5</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">6</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">7</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">8</div>
      <div className="h-full w-[300px] bg-yellow-400 rounded-xl flex-shrink-0">9</div> */}
    </div>
  )
}

export default TaskList
