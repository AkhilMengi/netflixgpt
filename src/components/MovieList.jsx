import React, { useRef } from 'react';
import MovieCards from './MovieCards';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // optional: any arrow icon


const MovieList = ({ movies, title }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  if (!movies) return <div>Loading {title}...</div>;

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-2 text-white px-2 w-fit">{title}</h1>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white"
        onClick={scrollLeft}
      >
        <ChevronLeft />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-4 px-8"
      >
        {movies.map((movie) => (
          <MovieCards
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
          />
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white"
        onClick={scrollRight}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MovieList;
