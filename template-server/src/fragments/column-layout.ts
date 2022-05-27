import { gql } from "graphql-request";
import { feedFavouriteFragment } from "./feed-favourite";
import { feedFavouriteCountFragment } from "./feed-favourite-count";

const columnLayoutFragment = gql`
  fragment columnLayoutFragment on ColumnLayout {
    __typename
    columns {
      align
      ...feedFavouriteFragment
      ...feedFavouriteCountFragment
    }
  }
  ${feedFavouriteFragment}
  ${feedFavouriteCountFragment}
`;

export { columnLayoutFragment };