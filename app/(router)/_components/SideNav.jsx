"use client"

import { useUser } from '@clerk/nextjs'
import { BadgeCheck, BadgeIcon, BookOpen, GraduationCap, LayoutDashboard, LayoutGrid, LayoutGridIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {
    const {user}=useUser();
    const menu=[
        {
            id:5,
            name:'DashBoard',
            icon: LayoutDashboard,
            path:'/dashboard',
            auth: user
        },
        {
            id:1,
            name:'All Cources',
            icon: BookOpen,
            path:'/courses',
            auth: true
        },
        {
            id:2,
            name:'Membership',
            icon: BadgeCheck,
            path:'/agrilearn-pro',
            auth: true
        }
    ]

    const path= usePathname();
    useEffect(()=>{
        console.log("path",path)
    },[])
  return (
    <div className='p-5 bg-white shadow-sm border h-screen'>
        <div className='flex justify-center items-center'>
        <Image src='/logo.svg' alt='logo'
        width={180} height={90} />
        </div>

        <hr className='mt-7'></hr>
        {/* Menu List */}
        <div className='mt-5 '>
            {menu.map((item)=>item.auth&&(
                <Link href={item.path} key={item.id}>
                <div className={`group flex gap-3 mt-5 p-3 text-[18px] items-center
                 text-gray-500 cursor-pointer
                 hover:bg-primary
                 hover:text-white
                   rounded-md
                   transition-all ease-in-out duration-200
                   ${path.includes(item.path)&&'bg-primary text-white'}`}>
                    <item.icon className='group-hover:animate-bounce'/>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SideNav