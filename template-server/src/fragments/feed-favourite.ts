import { gql } from "graphql-request";
import { favouriteActionFragment } from "./favourite-action";

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
  ${favouriteActionFragment}
`;

export { feedFavouriteFragment };