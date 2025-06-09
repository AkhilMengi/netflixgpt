import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../src/utils/movieSlice"
import { API_KEY } from "../src/utils/constants"

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()

    const getNowPlayingMovies = async () => {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page1",
                API_KEY)
            const json = await data.json()  
            console.log(json.results)
            dispatch(addNowPlayingMovies(json.results))
        } catch (error) {
            console.error("Failed to fetch movies", error)
        }
    }

    useEffect(() => {
        getNowPlayingMovies()
    }, [])
}

export default useNowPlayingMovies



