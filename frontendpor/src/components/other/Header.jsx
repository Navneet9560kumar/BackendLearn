import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center justify-between text-white">
      <h1 className="text-2xl font-medium">
        Hello <br /> 
        <span className="text-3xl font-semibold">Navneet😎</span>
      </h1>
      <button className="bg-red-600 text-lg text-white py-2 px-4 rounded-sm hover:bg-red-700">
        Logout
      </button>
    </div>
  )
}

export default Header
