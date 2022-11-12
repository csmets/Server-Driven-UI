import { gql } from "graphql-request";

const favouriteActionFragment = gql`
  fragment favouriteActionFragment on FavouriteAction {
    __typename
    feedId
    save {
      ...emitSignalFragment
    }
    unsave {
      ...emitSignalFragment
    }
  }
`;

export { favouriteActionFragment };