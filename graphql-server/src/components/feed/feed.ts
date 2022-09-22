import { MockFeedService } from '../../services/mock-feed-service';
import { feedImage } from './feed-image';
import { feedColumn } from './feed-column';
import { feedCaption } from './feed-caption';

const feedItemFactory = (id, caption, image, alt, count) => {
  return {
    items: [
      feedImage(image, alt),
      feedColumn(count, id),
      feedCaption(caption)
    ]
  }
};

export const fetchFeed = () => {
  const data = MockFeedService.getData()

  const feedList = data.map(({id, caption, image, alt, count}) => feedItemFactory(id, caption, image, alt, count));

  return feedList
};