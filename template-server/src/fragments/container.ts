import { gql } from "graphql-request";
import { boxFragment } from "./box";
import { cardFragment } from "./card";
import { typographyFragment } from "./typography";

export const containerFragment = gql`
  fragment containerFragment on Container {
    __typename
    elements {
      ...cardFragment
      ...typographyFragment
      ...boxFragment
    }
  }
  ${cardFragment}
  ${typographyFragment}
  ${boxFragment}
`;
