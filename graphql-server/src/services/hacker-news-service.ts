import axios from 'axios';

interface HNStoryResponse {
  data: {
    by: string;
    descendants: number;
    id: number;
    kids: unknown[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
  };
}

export const getHNTopStories = async (): Promise<HNStoryResponse[] | null> => {
  try {
    const topStoriesResponse = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );

    const topStoriesIds: string[] = topStoriesResponse.data.slice(0, 10);

    const topStoriesRequests = topStoriesIds.map(async id => {
      return await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
    });

    try {
      const [...response] = (await axios.all(
        topStoriesRequests
      )) as HNStoryResponse[];
      return response;
    } catch (error) {
      console.error(`Error in retrieving story info: ${error}`);
      return null;
    }
  } catch (error) {
    console.error(`Error in retrieving getHNTopStories: ${error}`);
  }

  return null;
};
