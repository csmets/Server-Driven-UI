import { gql } from "graphql-request";

const feedCaptionFragment = gql`
  fragment feedCaptionFragment on FeedCaption {
    __typename
    text
  }
`;

export { feedCaptionFragment };