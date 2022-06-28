import { gql } from "graphql-request";
import { hackerNewsViewFragment } from "../fragments/hacker-news-view";

const hackerNewsTopStoriesQuery = gql`
  query {
    hackerNewsTopStories {
      ...hackerNewsViewFragment
    }
  }
  ${hackerNewsViewFragment}
`;

export { hackerNewsTopStoriesQuery }
