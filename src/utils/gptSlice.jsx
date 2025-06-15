import { createSlice } from "@reduxjs/toolkit";



const gptSlice= createSlice({
    name:'gpt',
    initialState:{
        showGPTSearch:false,
        gptMovies:null,
        gptMovieName:null
    },
    reducers:{
        toggleGPTSearch: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
           
          },
        addGPTMovieResult:(state,action)=>{
            state.gptMovies=action.payload
        },
        addGPTMovieNames:(state,action)=>{
            state.gptMovieName = action.payload
        }
          
    }
})

export const {toggleGPTSearch,addGPTMovieResult,addGPTMovieNames} = gptSlice.actions

export default gptSlice.reducer