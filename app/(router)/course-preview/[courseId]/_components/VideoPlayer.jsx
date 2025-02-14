import React from 'react';

function VideoPlayer({ videoUrl, poster }) {
  // Debugging Logs
  console.log('Video URL:', videoUrl);

  if (!videoUrl) {
    return <p className="text-red-500">Error: Video URL is missing.</p>;
  }

  return (
    <video
      width="100%"
      height="auto"
      controls
      autoPlay
      key={videoUrl}
      className="rounded-sm"
      poster={poster}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
