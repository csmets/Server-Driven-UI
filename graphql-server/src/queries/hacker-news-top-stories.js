const { getHNTopStories } = require('../services/hacker-news-service');

const hackerNewsTopStoriesQuery = {
  hackerNewsTopStories: async () => {
    const result = await getHNTopStories()
    let elements = [];

    if (Array.isArray(result)) {
      elements = result.map((element) => {
        const { title, url, by } = element.data;

        const action = url ? { url } : null

        return {
          primary: title,
          secondaries: [by],
          action
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
          elements: [
            {
              // typename: Typography
              variant: "H1",
              value: "Top Stories"
            },
            ...elements
          ]
        }
      ]
    }
  }
};

module.exports = {
  hackerNewsTopStoriesQuery
}
