import React from 'react';
import VideoPlayer from './VideoPlayer';
import Markdown from 'react-markdown';
import { Button } from '@/components/ui/button';

function CourseVideoDescription({ courseInfo, activeChapterIndex, watchMode = false, setChapterCompleted }) {
  const validIndex = activeChapterIndex ?? 0;  // Default index if undefined

  console.log("Course Info:", courseInfo);
  console.log("Active Chapter Index:", validIndex);

  if (!courseInfo || !courseInfo.chapter || !courseInfo.chapter[validIndex]) {
    return <p className="text-red-500">Error: Course information is missing or invalid.</p>;
  }

  const chapter = courseInfo.chapter[validIndex];

  return (
    <div>
      <h2 className="text-[20px] font-semibold">{courseInfo.name}</h2>
      <h2 className="text-gray-500 text-[14px] mb-3">{courseInfo.author || 'Unknown Author'}</h2>

      <VideoPlayer videoUrl={chapter.video?.url} poster={!watchMode ? courseInfo.banner?.url : null} />

      <h2 className="mt-5 text-[17px] font-semibold">
        {watchMode ? (
          <span className="flex justify-between items-center">
            {chapter.name}
            <Button onClick={() => setChapterCompleted(chapter.id)}>Mark Completed</Button>
          </span>
        ) : (
          <span>About this Course</span>
        )}
      </h2>

      <Markdown className="text-[13px] font-light mt-2 leading-7">
        {watchMode ? chapter.shortDesc || 'No description available.' : courseInfo.description}
      </Markdown>
    </div>
  );
}

export default CourseVideoDescription;
