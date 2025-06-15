import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GPTsuggestion = () => {
  const { gptMovieName, gptMovies } = useSelector((store) => store.gpt);

  if (!gptMovieName || gptMovieName.length === 0) {
    return <p className="text-center text-white mt-8 text-lg">No movie suggestions yet.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">
      <p className="text-2xl text-white text-center font-medium max-w-3xl">
        🎬 <span className="font-semibold">Movie Suggestions:</span>{' '}
        <span className="text-yellow-300">{gptMovieName.join(', ')}</span>
      </p>

      {gptMovies && gptMovies[0] && (
        <div className="w-full px-4 md:px-20">
          {gptMovieName.map((movie,index)=>
            <MovieList
            key={movie} 
            title={movie} 
            movies={gptMovies[index]} />)}
        
        </div>
      )}
    </div>
  );
};

export default GPTsuggestion;
