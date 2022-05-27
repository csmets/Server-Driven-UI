import { gql } from "graphql-request";
import { emitSignalFragment } from "./emit-signal";

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
  ${emitSignalFragment}
`;

export { favouriteActionFragment };