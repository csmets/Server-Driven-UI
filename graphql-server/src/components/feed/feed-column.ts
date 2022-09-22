import { feedFavourite } from './feed-favourite';
import { feedFavouriteCount } from './feed-favourite-count';

export const feedColumn = (count, feedId) => {
  const feedFavouriteCache = `feedFavourite-${feedId}`;
  const feedFavouriteCountCache = `feedFavouriteCount-${feedId}`;
  return {
    columns: [
      feedFavourite(count, feedId, feedFavouriteCache),
      feedFavouriteCount(count, feedId, feedFavouriteCountCache)
    ]
  }
}