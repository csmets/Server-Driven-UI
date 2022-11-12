import { gql } from "graphql-request";

const feedFavouriteFragment = gql`
  fragment feedFavouriteFragment on FeedFavourite {
    __typename
    id
    icon
    signal {
      ...signalFragment
    }
    action {
      ...favouriteActionFragment
    }
  }
`;

export { feedFavouriteFragment };