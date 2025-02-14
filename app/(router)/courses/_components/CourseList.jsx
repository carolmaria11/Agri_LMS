import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CourseItem from './CourseItem';
import Link from 'next/link';

function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filter, setFilter] = useState('all');  // Default filter is 'all'

    useEffect(() => {
        getAllCourses();
    }, []);

    const getAllCourses = () => {
        GlobalApi.getAllCourseList().then(resp => {
            const courses = resp?.courseLists || [];
            setCourseList(courses);
            setFilteredList(courses);  // Default to all courses
        });
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        if (value === 'all') {
            setFilteredList(courseList);
        } else if (value === 'paid') {
            setFilteredList(courseList.filter(course => !course.free));
        } else if (value === 'free') {
            setFilteredList(courseList.filter(course => course.free));
        }
    };

    return (
        <div className='p-5 bg-white rounded-lg mt-5'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[20px] font-bold text-primary'>All Courses</h2>
                <Select onValueChange={handleFilterChange} defaultValue="all"> 
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {filteredList?.length > 0 ? filteredList.map((item, index) => (
                    <Link href={'/course-preview/' + item.slug} key={index}>
                        <div>
                            <CourseItem course={item} />
                        </div>
                    </Link>
                )) : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                    <div key={index} className='w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse'></div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;
