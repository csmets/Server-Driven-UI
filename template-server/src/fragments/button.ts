import { gql } from "graphql-request";

export const buttonFragment = gql`
  fragment buttonFragment on Button {
    __typename
    label
    action {
      ...editNameSubmitActionFragment
      ...urlActionFragment
    }
    disabled
    disableElevation
    buttonVariant
    buttonTheme
    buttonSize
  }
`;
