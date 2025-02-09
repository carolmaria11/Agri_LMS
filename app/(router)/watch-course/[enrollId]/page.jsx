"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from '../../course-preview/[courseId]/_components/CourseVideoDescription';
import CourseContentSection from '../../course-preview/[courseId]/_components/CourseContentSection';
import { toast } from 'sonner';

function WatchCourse({params}) {
  const {user} = useUser();
  const [courseInfo, setCourseInfo]= useState([]);
  const [completedChapter,setCompletedChapter]=useState([]);
  const [activeChapterIndex,setActiveChapterIndex]=useState(0);

  useEffect(()=>{
    params&&user&&getUserEnrolledCourseDetail();
  },[params&&user])

  //Get user Enrolled Course Details by Id and email
  const getUserEnrolledCourseDetail = () => {
    GlobalApi.getUserEnrolledCourseDetails(params.enrollId, user.primaryEmailAddress.emailAddress)
      .then(resp => {
        if (resp?.userEnrollCourses?.length > 0) {
          setCompletedChapter(resp.userEnrollCourses[0].completedChapter || []);
          setCourseInfo(resp.userEnrollCourses[0].courseList);
        }
      });
  };

  //save completed chapter Id
  const onChapterComplete=(chapterId)=>{
    GlobalApi.markChapterCompleted(params.enrollId,chapterId).then(resp=>{
      console.log(resp);
      if(resp)
      {
        toast('Chapter Marked as Completed');
        getUserEnrolledCourseDetail();
      }
    })
  }
  return courseInfo.name&&(
    <div>
       <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            {/* Title Video, Description */}
            <div className="col-span-2 bg-white p-3">
                <CourseVideoDescription courseInfo={courseInfo} 
                activeChapterIndex={activeChapterIndex}
                watchMode={true}
                setChapterCompleted={(chapterId)=>onChapterComplete(chapterId)}
                />
                
            </div>

            {/* Course Content */}
            <div>
                <CourseContentSection courseInfo={courseInfo}
                 isUserAlreadyEnrolled={true}
                 watchMode={true}
                 completedChapter={completedChapter}
                 setActiveChapterIndex={(index)=>setActiveChapterIndex(index)}/>
            </div>
        </div>
    </div>
  )
}

export default WatchCourse


// "use client"
// import GlobalApi from '@/app/_utils/GlobalApi'
// import { useUser } from '@clerk/nextjs'
// import React, { useEffect } from 'react'
// import { useParams } from 'next/navigation'

// function WatchCourse() {
//   const { user } = useUser();
//   const params = useParams(); // Use this instead of directly accessing props

//   useEffect(() => {
//     if (params?.enrollId && user?.primaryEmailAddress?.emailAddress) {
//       getUserEnrolledCourseDetail();
//     }
//   }, [params, user]);

//   // Get user enrolled course details
//   const getUserEnrolledCourseDetail = () => {
//     GlobalApi.getUserEnrolledCourseDetails(
//       params.enrollId, 
//       user.primaryEmailAddress.emailAddress
//     ).then(resp => {
//       console.log("API Response:", resp);
//     }).catch(error => {
//       console.error("API Error:", error);
//     });
//   };

//   return <div>WatchCourse</div>;
// }

// export default WatchCourse;
