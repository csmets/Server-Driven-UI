import { gql } from "graphql-request";
import { editNameSubmitActionFragment } from './actions';

export const buttonFragment = gql`
  fragment buttonFragment on Button {
    __typename
    label
    action {
      ...editNameSubmitActionFragment
    }
    variant
    disabled
    disableElevation
    theme
    size
  }
  ${editNameSubmitActionFragment}
`;
