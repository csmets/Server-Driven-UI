import { gql } from "graphql-request";
import { containerFragment } from "./container";

const hackerNewsViewFragment = gql`
  fragment hackerNewsViewFragment on HackerNewsView {
    elements {
      ...containerFragment
    }
  }
  ${containerFragment}
`;

export { hackerNewsViewFragment }
