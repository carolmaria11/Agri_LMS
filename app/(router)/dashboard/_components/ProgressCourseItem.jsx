import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function ProgressCourseItem({ course }) {
    const getTotalCompletedChapterPerc = (item) => {
        // Ensure completedChapter is an array and count its length
        const completedChapters = Array.isArray(item.completedChapter) ? item.completedChapter.length : 0;
        const totalChapters = item?.courseList?.chapter?.length || 1; // Avoid division by zero
        return (completedChapters / totalChapters) * 100;
    };

    return (
        <Link href={"/course-preview/"+course?.courseList?.slug}>
        <div className='border rounded-xl hover:shadow-md hover:shadow-emerald-300 cursor-pointer'>
            <Image 
                src={course.courseList?.banner?.url || '/default-banner.jpg'} 
                width={500} 
                height={150} 
                alt='banner' 
                className='rounded-t-xl'
            />
            <div className='flex flex-col gap-1 p-2'>
                <h2 className='font-medium'>{course.courseList?.name}</h2>
                <h2 className='text-[13px] text-gray-400'>{course.courseList?.author}</h2>
                <h2 className='text-[12px] text-gray-400 mt-3'>
                    {getTotalCompletedChapterPerc(course).toFixed(0)}% 
                    <span className='float-right'>
                        {Array.isArray(course.completedChapter) ? course.completedChapter.length : 0}
                        /{course?.courseList?.chapter?.length || 0} Chapters
                    </span>
                </h2>
                <Progress value={getTotalCompletedChapterPerc(course)} className='h-[7px]' />
            </div>
        </div>
        </Link>
    );
}

export default ProgressCourseItem;





// import { Progress } from '@/components/ui/progress'
// import Image from 'next/image'
// import React from 'react'

// function ProgressCourseItem({course}) {

//     const getTotalCompletedChapterPerc =(item)=>{
//         // perc={totalCompletedChapter/totalChapter}*100
//         const perc=(item.completedChapter?.length/item?.courseList?.chapter?.length)*100
//         return perc
//     }
//   return (
//     <div className='border rounded-xl hover:shadow-md hover:shadow-emerald-300 cursor-pointer'>
//             <Image src={course.courseList?.banner.url}
//             width={500}
//             height={150}
//             alt='banner'
//             className='rounded-t-xl'/> 
//            <div className='flex flex-col gap-1 p-2'>
//                 <h2 className='font-medium'>{course.courseList.name}</h2>
//                 <h2 className='text-[13px] text-gray-400'>{course.courseList.author}</h2>
//                 <h2 className='text-[12px] text-gray-400 mt-3'>
//                     {getTotalCompletedChapterPerc(course)}% 
//                     <span className='float-right'>{course.completedChapter}/{course?.courseList?.chapter?.length} Chapters</span></h2>
//                 <Progress value={33} className='h-[7px]' />
//             </div>
//         </div>
//   )
// }

// export default ProgressCourseItem