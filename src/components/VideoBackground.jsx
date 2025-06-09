import React from 'react'

import {  useSelector } from 'react-redux'

import useMovieTitle from '../../hooks/useMovieTitle'

const VideoBackground = ({ movieId }) => {
    
    const trailerVideo = useSelector(store=>store.movies?.trailerVideo)

   useMovieTitle(movieId)
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <iframe
            src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}`}

            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full object-cover"
          
          ></iframe>
        </div>
      );
}

export default VideoBackground



