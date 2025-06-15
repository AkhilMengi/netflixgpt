import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../src/utils/movieSlice"
import { API_KEY } from "../src/utils/constants"

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const  nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () => {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page1",
                API_KEY)
            const json = await data.json()  
            
            dispatch(addNowPlayingMovies(json.results))
        } catch (error) {
            console.error("Failed to fetch movies", error)
        }
    }

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies



