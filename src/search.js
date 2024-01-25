require("dotenv").config({ path: "../.env" });
const axios = require("axios");

// Replace 'YourSearchEngineApiKey' with your actual API key
const API_KEY = process.env.YOUR_SEARCH_ENGINE_API_KEY;
const SEARCH_ENGINE_ID = process.env.YOUR_SEARCH_ENGINE_ID;
console.log("API_KEY:", process.env.YOUR_SEARCH_ENGINE_API_KEY);
console.log("SEARCH_ENGINE_ID:", process.env.YOUR_SEARCH_ENGINE_ID);

const searchTheWeb = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await axios.get(url);
    const results = response.data.items;
    console.log("Search Results:", results);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

// Replace 'your personal data' with the actual data you're searching for
searchTheWeb("zurich");
