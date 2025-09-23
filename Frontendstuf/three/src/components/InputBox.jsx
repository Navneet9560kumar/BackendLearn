import React from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "",
  amountDisabled = false,
  currencyDisabled = false,
  classname = "",
}) {
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${classname}`}>
      <div  className='w-1-2'>
      <label htmlFor={id} className='text-black/40 md-2 inline-block'>{label}</label>
      <input 
      id={id}
      type="number"
      className='outline-none w-fll bg-transparent py-1.5'
      placeholder='Amount'
      disabled={amountDisabled}
      value={amount}
      onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
      />
      <div className='w-1/2 flex flex-wrap justify-end text-right'>
      <p className='text-black/40 md-2 w-full'>Currency Type</p>
      <select className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none' value={selectedCurrency}
      onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
      disabled={currencyDisabled}
      >

        {currencyOptions.map((Currency)=> (
          <option key={Currency} value={Currency}>{Currency}</option>
        ))}
      </select>
      </div>
      </div>
    </div>
  )
}

export default InputBox
