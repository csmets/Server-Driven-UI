import { gql } from "graphql-request";
import {containerFragment} from "../fragments/container";

const hackerNewsTopStoriesQuery = gql`
  query {
    hackerNewsTopStories {
      ...containerFragment
    }
  }
  ${containerFragment}
`;

export { hackerNewsTopStoriesQuery }
