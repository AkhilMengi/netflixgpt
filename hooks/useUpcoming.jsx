
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {  addUpcomingMovies } from "../src/utils/movieSlice"
import { API_KEY } from "../src/utils/constants"

const useUpcomingMovies = () => {
    const dispatch = useDispatch()

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
        getUpcomingMovies()
    }, [])
}

export default useUpcomingMovies



