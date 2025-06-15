import React, { useRef } from 'react'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import lang from "../utils/languageConstant"
import openAI from '../utils/openAI'
import { API_KEY } from '../utils/constants'
import { addGPTMovieNames, addGPTMovieResult } from '../utils/GPTSlice'

const GPTSearch = () => {
    const dispatch = useDispatch()
    const language = useSelector(store => store.config.lan)
    const searchText = useRef(null)

    const searchMovieTMDB= async(movie)=>{
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query="+
            movie +
            "&include_adult=false&language=en-US&page=1",
        API_KEY)
        const json = await data.json()
        return json.results
    }
    
    const handleGPTSearchClick = async () => {
        try {
            const queryInput = searchText.current?.value;
            if (!queryInput || queryInput.trim() === '') {
                
                return;
            }
    
            
    
            const query = "Act as a Movie expert who recommend movies based on the query: " 
                + queryInput 
                + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: gadar2, sholay, 3idiots, Don, koi mil gya";
    
            const gptResult = await openAI.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user',
                    content: query
                }],
                temperature: 0.7,
                max_tokens: 100,
            });
    
            const response = gptResult.choices?.[0]?.message?.content;
            if (response) {
               
            } else {
                console.error("No response from GPT.");
            }
            const gptSuggestedMovies =response.split(',')

            //for each movie  i will search TMDB API

            const promiseArray= gptSuggestedMovies.map((movie)=>searchMovieTMDB(movie))
            const  searchTMDBResults = await Promise.all(promiseArray)
         

            //dispatching action to store the movie names in the store
            dispatch(addGPTMovieNames(gptSuggestedMovies))

            //dispatching action to store all the movies foud in the TMDB API in the store
            dispatch(addGPTMovieResult(searchTMDBResults))

        } catch (error) {
            console.error("Error while fetching GPT response:", error);
        }
    };

   

    return (
        <div className="flex justify-center items-center  px-4">
            <div className="flex w-full max-w-xl">
                {/* Search Input with Icon */}
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        ref={searchText}
                        type="text"
                        placeholder={lang[language].gptSearchPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-400"
                    />
                </div>


                <button
                    //   onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 rounded-r-2xl transition-colors"
                    onClick={handleGPTSearchClick}
                >
                    {lang[language].Search}
                </button>
            </div>
        </div>
    )
}

export default GPTSearch
