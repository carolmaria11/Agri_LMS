import Image from 'next/image'
import React from 'react'

function WelcomeBannerDashboard({user}) {
  return (
    <div className='bg-emerald-200 rounded-sm p-5 flex gap-5 items-center' >
        <Image src='/plant.png' alt='plant' 
        width={120}
        height={120} />
        <div>
            <h2 className='font-bold text-[27px]'>Welcome Back, 
             <span className='text-primary'> {user?.fullName}</span></h2>
            <h2 className='text-gray-500'>Let's Begin from where you left, Keep it up and improve your progress</h2>
        </div>
    </div>
  )
}

export default WelcomeBannerDashboard