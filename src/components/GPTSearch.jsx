import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import lang from "../utils/languageConstant"

const GPTSearch = () => {
    const language = useSelector(store=>store.config.lan)
  
  return (
    <div className="flex justify-center items-center  px-4">
      <div className="flex w-full max-w-xl">
        {/* Search Input with Icon */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={lang[language].gptSearchPlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

   
        <button
        //   onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 rounded-r-2xl transition-colors"
        >
         {lang[language].Search}
        </button>
      </div>
    </div>
  )
}

export default GPTSearch
