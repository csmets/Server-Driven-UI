const MockFeedService = {
  getData: () => {
    return [
      {
        "id": "id1",
        "caption": "My cute little puppy",
        "count": 21,
        "image": "https://picsum.photos/id/1025/4951/3301",
        "alt": "Cute wrapped up dog"
      },
      {
        "id": "id2",
        "caption": "Amazing Australian views",
        "count": 10,
        "image": "https://picsum.photos/id/1016/3844/2563",
        "alt": "A landscape image of Australia"
      }
    ]
  }
}

module.exports = {
  MockFeedService
}