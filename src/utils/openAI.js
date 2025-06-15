

import OpenAI from 'openai';
import { gptAPI_KEY } from './constants';

const openAI = new OpenAI({
  apiKey: import.meta.env.VITE_gptAPI_KEY.replace("sk-", "sk-"), 
  dangerouslyAllowBrowser: true,
});

export default openAI;