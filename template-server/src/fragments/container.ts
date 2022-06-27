import { gql } from "graphql-request";
import { cardFragment } from "./card";

export const containerFragment = gql`
  fragment containerFragment on Container {
    elements {
      ...cardFragment
    }
  }
  ${cardFragment}
`;
