
import Header from './Header'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import PrimaryComponent from './PrimaryComponent'
import { SecondaryComponent } from './SecondaryComponent'


const Browse = () => {

  useNowPlayingMovies()
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