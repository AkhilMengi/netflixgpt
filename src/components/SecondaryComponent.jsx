import { useSelector } from "react-redux"
import MovieList from './MovieList'

export const SecondaryComponent = () => {
  const movies = useSelector(store => store.movies)
  
  return (
    <div className="bg-black">
      <div className="-mt-15 pl-5 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
         <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList title={"Up-Coming Movies"} movies={movies.upComingMovies} />
      </div>
    </div>
  )
}
