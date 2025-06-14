
import React from 'react'
import GPTSearch from './GPTSearch';
import GPTsuggestion from './GPTsuggestion';

const GPT = () => {
    return (
      <div className="pt-24 px-6 text-white min-h-screen bg-black">
        <GPTSearch />
        <GPTsuggestion />
        {/* Your GPT form or content goes here */}
      </div>
    );
  };
  

export default GPT