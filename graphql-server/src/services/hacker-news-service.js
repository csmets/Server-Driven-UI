const axios = require('axios');

const getHNTopStories = async () => {
  try {
    const topStoriesResponse = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");

    const topStoriesIds = topStoriesResponse.data.slice(0, 10);

    const topStoriesRequests = topStoriesIds.map(async(id) => {
      return await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    });

    try {
      const [...response] = await axios.all(topStoriesRequests);
      return response;
    } catch (error) {
      console.error(`Error in retrieving story info: ${error}`);
      return null;
    }
  } catch (error) {
    console.error(`Error in retrieving getHNTopStories: ${error}`);
  }

  return null;
}

module.exports = {
  getHNTopStories
}
