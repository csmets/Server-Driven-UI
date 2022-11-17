import { gql } from "graphql-request";

export const favouriteButtonFragment = gql`
  fragment favouriteButtonFragment on FavouriteButton {
    __typename
    action {
      ...editNameSubmitActionFragment
      ...urlActionFragment
      ...favouriteActionFragment
    }
    disabled
    buttonSize
    icon
    signal {
      ...signalFragment
    }
  }
`;
