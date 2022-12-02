import { gql } from "graphql-request";
import { editNameSubmitActionFragment, urlActionFragment } from "./actions";
import { boxFragment } from "./box";
import { buttonFragment } from "./button";
import { cardFragment } from "./card";
import { favouriteActionFragment } from "./favourite-action";
import { typographyFragment } from "./typography";

export const containerFragment = gql`
  fragment containerFragment on Container {
    __typename
    containerType
    elements {
      ...cardFragment
      ...typographyFragment
      ...boxFragment
      ...buttonFragment
      ...imageFragment
    }
  }
  ${cardFragment}
  ${typographyFragment}
  ${boxFragment}
  ${buttonFragment}
  ${editNameSubmitActionFragment}
  ${urlActionFragment}
  ${favouriteActionFragment}
`;
