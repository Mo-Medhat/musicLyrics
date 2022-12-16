import React from 'react'
import  loader  from '../assets/loader.svg'

function Loader({title}) {

  return <>
    <div className='w-full flex justify-center items-center flex-col'>
      <img src={loader} className="w-32 h-32 object-contain" alt='loader'/>
      <h1 className='font-bold text-2xl text-white mt-2'>{title || "Loading..."}</h1>
    </div>
  </>
}

export default Loader