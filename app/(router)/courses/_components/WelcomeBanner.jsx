import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
        <Image src='/plant.png' alt='plant' 
        width={100}
        height={100} />
        <div>
            <h2 className='font-bold text-[27px]'>
                Welcome to <span className='text-primary'>AgriLearn</span></h2>
            <h2 className='text-gray-500'>Cultivate Knowledge, Nurture Skills, and Harvest Success</h2>
        </div>
    </div>
  )
}

export default WelcomeBanner