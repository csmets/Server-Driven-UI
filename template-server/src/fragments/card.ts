import { gql } from "graphql-request";
import { imageFragment } from "./image";
import { favouriteButtonFragment } from './favourite-button';

export const cardFragment = gql`
  fragment cardFragment on Card {
    __typename
    primary
    secondaries
    content
    action {
      ...urlActionFragment
    }
    links {
      ...buttonFragment
      ...favouriteButtonFragment
    }
    media {
      ...imageFragment
    }
    signal {
      ...signalFragment
    }
  }
  ${imageFragment}
  ${favouriteButtonFragment}
`;
