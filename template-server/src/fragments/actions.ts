import { gql } from "graphql-request";
import { emitSignalFragment } from "./emit-signal";

export const editNameSubmitActionFragment = gql`
  fragment editNameSubmitActionFragment on EditNameSubmitAction {
      __typename
      inputIds
      emitSignal {
          ...emitSignalFragment
      }
  }
  ${emitSignalFragment}
`;

export const urlActionFragment = gql`
  fragment urlActionFragment on URLAction {
    __typename
    url
    description
  }
`;
