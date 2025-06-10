import { useSelector } from "react-redux"
import MovieList from './MovieList'

export const SecondaryComponent = () => {
  const movies = useSelector(store => store.movies)
  return (
    <div className="bg-black">
      <div>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
         <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Funny"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  )
}
