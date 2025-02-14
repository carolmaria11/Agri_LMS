import { UserMemberContext } from '@/app/_context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { toast } from "sonner"

function CourseEnrollSection({courseInfo,isUserAlreadyEnrolled}) {
    // const membership = false;
    const {user} =useUser();
    const {isMember,setIsMember}=useContext(UserMemberContext);
    const router = useRouter();

    useEffect(()=>{
      console.log("isUserAlreadyEnrolled",isUserAlreadyEnrolled)
    })

    //Enroll to Course
    const onEnrollCourse=()=>{
      GlobalApi.enrollToCourse(courseInfo?.slug,user?.primaryEmailAddress?.emailAddress).then(resp=>{
        console.log("Respdneoneof"+resp);
        
        if(resp)
        {
          //Show toast on successfull enroll
          toast("User Enroll Successfull", {
            description: "User Enrolled to this course",
          })
          //Redirect to watch course
          router.push('/watch-course/'+resp.createUserEnrollCourse.id)
        }
        
      })
    }
  return (
    <div className='p-3 text-center rounded-sm bg-primary'>

 
        <h2 className='text-[22px] font-bold text-white'>Enroll to Course</h2>

        {/* User has membership and already login  */}
        {user&&(isMember||courseInfo.free)&&!isUserAlreadyEnrolled?<div className=' flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Enroll now to start learning and building the broject</h2>
        <Button className="bg-white text-primary hover:bg-white hover:text-primary" onClick={()=>onEnrollCourse()}>Enroll Now</Button>
        </div>
        :!user?
        <div className=' flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Enroll now to start learning and building the broject</h2>
        <Link href={'/sign-in'}><Button className="bg-white 
        text-primary hover:bg-white hover:text-primary">Enroll Now</Button>
        </Link>
        </div>
       : !isUserAlreadyEnrolled&&<div className=' flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Buy Monthly Membership and Get Access to all the Courses</h2>
        <Link href={"/agrilearn-pro"}><Button className="bg-white text-primary hover:bg-white hover:text-primary">Buy Membership Just For Rs.300</Button></Link>
        </div>}
        {/*Above section user does not hav membership or not login or signup  */}

       { isUserAlreadyEnrolled&&
       <div className=' flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Continue to learn your project</h2>
        <Link href={'/watch-course/'+isUserAlreadyEnrolled}><Button className="bg-white text-primary hover:bg-white hover:text-primary">Continue</Button></Link>
        </div>}

    </div>
  )
}

export default CourseEnrollSection