import { gql } from "graphql-request";
import { cardFragment } from "./card";
import { typographyFragment } from "./typography";

export const containerFragment = gql`
  fragment containerFragment on Container {
    __typename
    elements {
      ...cardFragment
      ...typographyFragment
    }
  }
  ${cardFragment}
  ${typographyFragment}
`;
