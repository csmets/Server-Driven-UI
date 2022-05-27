import { gql } from "graphql-request";

const feedFavouriteCountFragment = gql`
  fragment feedFavouriteCountFragment on FeedFavouriteCount {
    __typename
    id
    count
    signal {
      ...signalFragment
    }
  }
`;

export { feedFavouriteCountFragment };