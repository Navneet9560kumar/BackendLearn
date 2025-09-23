
import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hook/useCurrencyInfo'

function App() {

  const [amount, setAmount] =useState(0)
  const[from, setFrom] = useState('usd')
  const[to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)


  const  currencyInfo= useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const swap= () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount * currencyInfo[to])
    setAmount()

  }

  return (
   <div className='w-full h-screen flex  flex-wrap justify-center items-center bg-conver bg-no-repeat' style={{backgroundImage: `url(https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}}>

    <div className='w-full'>
      <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'></div>
    </div>
   </div>
  )
}

export default App
