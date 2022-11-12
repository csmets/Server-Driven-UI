import { gql } from "graphql-request";
import { imageFragment } from "./image";

export const cardFragment = gql`
  fragment cardFragment on Card {
    __typename
    primary
    secondaries
    action {
      ...urlActionFragment
    }
    links {
      ...buttonFragment
    }
    media {
      ...imageFragment
    }
    signal {
      ...signalFragment
    }
  }
  ${imageFragment}
`;
