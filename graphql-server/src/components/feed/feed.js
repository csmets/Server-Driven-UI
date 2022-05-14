const { MockFeedService } = require('../../services/mock-feed-service');
const { feedImage } = require('./feed-image');
const { feedColumn } = require('./feed-column');
const { feedCaption } = require('./feed-caption');

const feedItemFactory = (id, caption, image, alt, count) => {
  return {
    items: [
      feedImage(image, alt),
      feedColumn(count, id),
      feedCaption(caption)
    ]
  }
};

const fetchFeed = () => {
  const data = MockFeedService.getData()

  const feedList = data.map(({id, caption, image, alt, count}) => feedItemFactory(id, caption, image, alt, count));

  return feedList
};


module.exports = {
  fetchFeed
};