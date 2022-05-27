import { gql } from "graphql-request";
import { columnLayoutFragment } from "./column-layout";
import { feedCaptionFragment } from "./feed-caption";
import { feedImageFragment } from "./feed-image";

const feedItemFragment = gql`
  fragment feedItemFragment on FeedItem {
    __typename
    items {
      ...columnLayoutFragment
      ...feedCaptionFragment
      ...feedImageFragment
    }
  }
  ${columnLayoutFragment}
  ${feedCaptionFragment}
  ${feedImageFragment}
`;

export { feedItemFragment };