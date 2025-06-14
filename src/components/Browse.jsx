
import Header from './Header'
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies'
import PrimaryComponent from './PrimaryComponent'
import { SecondaryComponent } from './SecondaryComponent'
import usePopularMovies from '../../hooks/usePopularMovies'
import useUpcomingMovies from '../../hooks/useUpcoming'
import GPT from './GPT'
import { useSelector } from 'react-redux'


const Browse = () => {
  const gptSearchShow = useSelector(store => store.gpt.showGPTSearch)


  useNowPlayingMovies()
  usePopularMovies()
  useUpcomingMovies()



  return (
    <div className="relative">
      <Header />
      <div className="pt-20">
        {gptSearchShow ? <GPT /> : <>
          <PrimaryComponent />
          <SecondaryComponent />
        </>}
      </div>
    </div>

  )
}

export default Browse