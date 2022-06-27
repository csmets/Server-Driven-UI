import { urlActionFragment } from "./actions";
import { gql } from "graphql-request";

export const cardFragment = gql`
  fragment cardFragment on Card {
    __typename
    primary
    secondaries
    action {
      ...urlActionFragment
    }
  }
  ${urlActionFragment}
`;
