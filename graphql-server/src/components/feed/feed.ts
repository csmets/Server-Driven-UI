import {MockFeedService} from '../../services/mock-feed-service';
import {Card, SignalType} from '../../types';
import {feedFavouriteButton} from './feed-favourite';

const cardFactory = (
  id: string,
  caption: string,
  image: string,
  alt: string,
  count: number,
  isTopStory: boolean
): Card => {
  const secondaries = [];
  if (isTopStory) secondaries.push("Top Story")
  return {
    __typename: 'Card',
    primary: caption,
    secondaries,
    media: {
      __typename: 'Image',
      url: image,
      alt,
    },
    links: [feedFavouriteButton(count, id, false)],
    content: [`${count} likes`],
    signal: {
      type: SignalType.Update,
      reference: `ref-${id}-count`,
    },
  };
};

export const fetchFeed = (): Card[] => {
  const data = MockFeedService.getData();

  const feedList = data.map(({id, caption, image, alt, count, isTopStory}) =>
    cardFactory(id, caption, image, alt, count, isTopStory)
  );

  return feedList;
};
