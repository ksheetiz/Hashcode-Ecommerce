import React, { useEffect } from 'react'
import Image from 'next/image'

function error({clearCart}) {

    useEffect(() => {
      clearCart();
    }, [])
    

  return (
    <div className='flex h-screen'>
        <div className='m-auto flex-col text-center'>
            <Image src='/Error_home.svg' width='800' height='800'/>
            <p className='font-bold text-4xl text-red-600'>Error</p>
            <p className='font-semibold text-xl'>You may have encountered an error from our end and redirected here !! Please Try again</p>
        </div>
    </div>
  )
}

export default error