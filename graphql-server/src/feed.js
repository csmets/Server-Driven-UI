const { signal } = require('./signal');

const favouriteAction = (id, signal) => {
  return {
    id,
    signal
  };
};

const feedImage = (src, alt) => {
  return {
    type: 'image',
    src,
    alt
  };
};

const feedCaption = (text) => {
  return {
    type: 'typography',
    text
  }
}

const feedFavourite = (id) => {
  return {
    type: 'icon',
    icon: 'Heart Icon',
    action: favouriteAction(id, signal(`signal-${id}`))
  }
}

const mockResponseData = [
  {
    id: "id1",
    caption: "My cute little puppy",
    image: "https://picsum.photos/id/1025/4951/3301",
    alt: "Cute wrapped up dog"
  }
]

const feedItemFactory = (id, caption, image, alt) => {
  return {
    items: [
      feedImage(image, alt),
      feedFavourite(id),
      feedCaption(caption)
    ]
}
}

const fetchFeed = () => {
  const data = mockResponseData

  const feedList = data.map(({id, caption, image, alt}) => feedItemFactory(id, caption, image, alt));

  console.log(feedList)

  return feedList
};

module.exports = {
  fetchFeed
};