import {getHNTopStories} from '../services/hacker-news-service';
import {Card} from '../types';

export const hackerNewsTopStoriesQuery = {
  hackerNewsTopStories: async () => {
    const result = await getHNTopStories();
    let elements: Card[] = [];

    if (Array.isArray(result)) {
      elements = result.map((element): Card => {
        const {title, url, by} = element.data;

        const action = url ? {url} : null;

        return {
          primary: title,
          secondaries: [by],
          action,
        };
      });
    }

    return {
      // typename: HackerNewsView
      // view elements
      elements: [
        {
          // typename: Container
          // container elements
          containerType: 'FILL',
          elements: [
            {
              // typename: Typography
              typographyVariant: 'H1',
              value: 'Top Stories',
              typographyTheme: 'PRIMARY',
            },
            {
              // typename: Box
              width: null,
              height: 24,
              _debugColor: null,
            },
            ...elements,
          ],
        },
      ],
    };
  },
};
