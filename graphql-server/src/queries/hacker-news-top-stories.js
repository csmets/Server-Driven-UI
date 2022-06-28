const { getHNTopStories } = require('../services/hacker-news-service');

const hackerNewsTopStoriesQuery = {
  hackerNewsTopStories: async () => {
    const result = await getHNTopStories()
    let elements = [];

    if (Array.isArray(result)) {
      elements = result.map((element) => {
        const { title, url, by } = element.data;
        return {
          primary: title,
          secondaries: [by],
          action: {
            url
          }
        }
      });
    }

    return {
      // typename: HackerNewsView
      // view elements
      elements: [
        {
          // typename: Container
          // container elements
          elements
        }
      ]
    }
  }
};

module.exports = {
  hackerNewsTopStoriesQuery
}
