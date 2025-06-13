import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addPopularMovies } from "../src/utils/movieSlice"
import { API_KEY } from "../src/utils/constants"

const usePopularMovies = () => {
    const dispatch = useDispatch()

    const getPopluarMovies = async () => {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page1",
                API_KEY)
            const json = await data.json()

            dispatch(addPopularMovies(json.results))
        } catch (error) {
            console.error("Failed to fetch movies", error)
        }
    }

    useEffect(() => {
        getPopluarMovies()
    }, [])
}

export default usePopularMovies



