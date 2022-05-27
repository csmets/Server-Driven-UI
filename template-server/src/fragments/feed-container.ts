import { gql } from "graphql-request";
import { feedHeadingFragment } from "./feed-heading";
import { feedItemFragment } from "./feed-item";
import { typographyContentFragment } from "./typography-content";

const feedContainerFragment = gql`
  fragment feedContainerFragment on FeedContainer {
    __typename
    elements {
      ...feedHeadingFragment
      ...typographyContentFragment
      ...feedItemFragment
    }
  }
  ${feedHeadingFragment}
  ${typographyContentFragment}
  ${feedItemFragment}
`

export { feedContainerFragment };