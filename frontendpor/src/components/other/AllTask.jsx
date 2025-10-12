import React from 'react'

const AllTask = () => {
  return (
    <div className="bg-[#1c1c1c] p-6 mt-5 rounded-lg shadow-md space-y-4">
      
      <div className="bg-gradient-to-r from-[#ff7b7b] to-[#ff4d4d] py-3 px-5 flex justify-between items-center rounded-md text-white">
        <h2 className="font-semibold text-lg">Navneet</h2>
        <h3 className="text-base font-medium italic">Make a UI Design</h3>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
          In Progress
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] py-3 px-5 flex justify-between items-center rounded-md text-white">
        <h2 className="font-semibold text-lg">Rahul</h2>
        <h3 className="text-base font-medium italic">Write Backend API</h3>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
          Completed
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#43e97b] to-[#38f9d7] py-3 px-5 flex justify-between items-center rounded-md text-white">
        <h2 className="font-semibold text-lg">Priya</h2>
        <h3 className="text-base font-medium italic">Test Application</h3>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
          Pending
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#fa709a] to-[#fee140] py-3 px-5 flex justify-between items-center rounded-md text-white">
        <h2 className="font-semibold text-lg">Aman</h2>
        <h3 className="text-base font-medium italic">Fix Bugs</h3>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
          In Review
        </span>
      </div>

      <div className="bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] py-3 px-5 flex justify-between items-center rounded-md text-white">
        <h2 className="font-semibold text-lg">Kriti</h2>
        <h3 className="text-base font-medium italic">Deploy Project</h3>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
          Not Started
        </span>
      </div>

    </div>
  )
}

export default AllTask
