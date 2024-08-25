export interface FeedItem {
  likes: number;
  title: string;
  image: string;
  id: number;
  isTopStory: boolean;
}

export interface FetchFeedResponse {
  feed: FeedItem[];
}

export interface FetchFeed {
  loading: boolean;
  data?: FetchFeedResponse;
}