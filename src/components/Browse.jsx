
import Header from './Header'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import PrimaryComponent from './PrimaryComponent'
import { SecondaryComponent } from './SecondaryComponent'
import usePopularMovies from '../../hooks/usePopularMovies'
import useUpcomingMovies from '../../hooks/useUpcoming'


const Browse = () => {

  useNowPlayingMovies()
  usePopularMovies()
  useUpcomingMovies()
  return (
    <div className="relative">
      <Header />
      <main className="pt-20">
        <PrimaryComponent />
        <SecondaryComponent />
      </main>
    </div>
  )
}

export default Browse