import React from 'react';
import { IMG_CDN } from '../utils/constants';

const MovieCards = ({ posterPath, title }) => {
  if(!posterPath) return null
  return (
    <div className="w-48 h-36  flex-shrink-0 m-2 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 bg-white">
      <img
        alt={title}
        src={IMG_CDN + posterPath}
        className="w-full h-36 object-cover"
      />
    
    </div>
  );
};

export default MovieCards;
