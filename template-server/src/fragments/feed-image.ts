import { gql } from "graphql-request";

const feedImageFragment = gql`
  fragment feedImageFragment on FeedImage {
    __typename
    src
    alt
  }
`;

export { feedImageFragment };