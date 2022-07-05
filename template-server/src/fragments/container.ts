import { gql } from "graphql-request";
import { cardFragment } from "./card";
import { headingFragment } from "./heading";
import { paragraphFragment } from "./paragraph";

export const containerFragment = gql`
  fragment containerFragment on Container {
    __typename
    elements {
      ...cardFragment
      ...headingFragment
      ...paragraphFragment
    }
  }
  ${cardFragment}
  ${headingFragment}
  ${paragraphFragment}
`;
