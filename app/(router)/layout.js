"use client"
import React, { useContext, useEffect } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '../_utils/GlobalApi'
import { UserMemberContext } from '../_context/UserMemberContext'

function layout({children}) {
  const {user} = useUser();
  const {isMember,setIsMember}=useContext(UserMemberContext);
  useEffect(()=>{
    user&&checkUserMembership();
  },[user])

  // use to check user membership
  const checkUserMembership=()=>{
    GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress)
    .then((resp) => {
      console.log(resp);
      if(resp?.memberships?.length>0){
        console.log("Its Member");
        setIsMember(true);
      }
    })
  }
  return (
    <div>
        <div className='sm:w-64 sm:block fixed'>
            <SideNav/>
        </div>
        <div className='ml-64'>
            <Header/>
        {children}
        </div>
        
    </div>
  )
}

export default layout