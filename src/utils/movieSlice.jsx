import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo:null
    },

    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailer:(state,action)=>{
            state.trailerVideo = action.payload
        }

    }
})

export const {addNowPlayingMovies,addTrailer} =  movieSlice.actions
export default movieSlice.reducer