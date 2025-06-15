import { useEffect } from "react"
import { addTrailer } from "../src/utils/movieSlice"
import { useDispatch, useSelector } from "react-redux"
import { API_KEY } from "../src/utils/constants"



const useMovieTitle = (movieId) => {
    const dispatch = useDispatch()
    const trailerVideo= useSelector(store=>store.movies.trailerVideo)

    const getMovieTrailer = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,API_KEY)
        const json = await data.json()
        
        const filterData = json.results.filter(video => video.type === "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0]
        dispatch(addTrailer(trailer))
       
    }

    useEffect(() => {
        !trailerVideo && getMovieTrailer()
    }, [])
}

export default useMovieTitle