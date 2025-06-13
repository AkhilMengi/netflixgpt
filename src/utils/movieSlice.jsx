import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies:null,
        upComingMovies:null,
        trailerVideo:null
    },

    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upComingMovies = action.payload
        },
        addTrailer:(state,action)=>{
            state.trailerVideo = action.payload
        }

    }
})

export const {addNowPlayingMovies,addTrailer,addPopularMovies,addUpcomingMovies} =  movieSlice.actions
export default movieSlice.reducer