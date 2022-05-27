import { gql } from "graphql-request";
import { textInputFragment } from './text-input';
import { buttonFragment } from './button';

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
`;