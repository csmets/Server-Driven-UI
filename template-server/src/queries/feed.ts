import { gql } from "graphql-request";
import { feedViewFragment } from "../fragments/feed-view";

const feedQuery = gql`
  query {
    feed {
      ...feedViewFragment
    }
  }
  ${feedViewFragment}
`;

export { feedQuery }