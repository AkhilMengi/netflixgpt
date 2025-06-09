import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[30%] left-0 px-12 text-white max-w-2xl z-10">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
        {title}
      </h1>
      <p className="text-lg mb-6 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)] line-clamp-3">
        {overview}
      </p>
      <div className="flex gap-4">
        <button className="bg-[rgba(57,31,31,0.5)] text-black font-semibold px-6 py-2 rounded-md hover:bg-[rgba(255,255,255,1)] transition shadow-md">
          ▶ Play
        </button>

        <button className="bg-gray-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-600 transition shadow-md">
          More Info
        </button>
      </div>
    </div>
  );

}

export default VideoTitle
