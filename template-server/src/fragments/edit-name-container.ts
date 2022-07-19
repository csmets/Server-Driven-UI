import { gql } from "graphql-request";
import { textInputFragment } from './text-input';
import { buttonFragment } from './button';
import {editNameSubmitActionFragment, urlActionFragment} from "./actions";

export const editNameContainerFragment = gql`
  fragment editNameContainerFragment on EditNameContainer {
    __typename
    elements {
      ...textInputFragment
      ...buttonFragment
    }
  }
  ${textInputFragment}
  ${buttonFragment}
  ${editNameSubmitActionFragment}
  ${urlActionFragment}
`;
