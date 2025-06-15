
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  addUpcomingMovies } from "../src/utils/movieSlice"
import { API_KEY } from "../src/utils/constants"

const useUpcomingMovies = () => {
    const dispatch = useDispatch()
    const upComingMovies = useSelector(store=>store.movies.upComingMovies)

    const getUpcomingMovies = async () => {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page1",
                API_KEY)
            const json = await data.json()  
            
            dispatch(addUpcomingMovies(json.results))
        } catch (error) {
            console.error("Failed to fetch movies", error)
        }
    }

    useEffect(() => {
        if (!upComingMovies || upComingMovies.length === 0) {
            getUpcomingMovies()
        }
    }, [upComingMovies])
}

export default useUpcomingMovies



