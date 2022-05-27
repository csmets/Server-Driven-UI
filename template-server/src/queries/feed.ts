import { gql } from "graphql-request";
import { feedContainerFragment } from "../fragments/feed-container";

const feedQuery = gql`
  query {
    feed {
      ...feedContainerFragment
    }
  }
  ${feedContainerFragment}
`;

export { feedQuery }