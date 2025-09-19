
// import { useState } from 'react';
import { useState } from 'react'
import './App.css'
// import Card from './compontent/Card'

function App() {
  
const [color, setColor] =  useState('olive')

function changeColor(color){
  setColor(color);
}

  // const addValue = () =>{
  //  setCounter((prevCounter)=> {
  //   return prevCounter +1;
  //  })
  //   setCounter((prevCounter)=> {
  //   return prevCounter +1;
  //  })
  //   setCounter((prevCounter)=> {
  //   return prevCounter +1;
  //  })
  //   setCounter((prevCounter)=> {
  //   return prevCounter +1;
  //  })
  // }

  //  const removeValue = () =>{
   
  //  setCounter(counter-1)
  // }

  return (
<div className="w-full h-screen bg-black flex items-end justify-center" style={{backgroundColor : color}}>
  <div className="mb-6 shadow-lg bg-white px-4 py-2 rounded-3xl flex gap-4">
    <button 
    onClick={()=> changeColor('red')}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ">
      Test
    </button>
    <button 
    onClick={()=> changeColor('yellow')}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      Test2
    </button>
  </div>
</div>

  )
}


// ha set color ke jagah setColor bhi use kar sakte hai ham 
export default App
