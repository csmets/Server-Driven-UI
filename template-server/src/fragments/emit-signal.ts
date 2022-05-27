import { gql } from "graphql-request";
import { signalFragment } from "./signal";
import { signalValuePairFragment } from "./signal-value-pair";

const emitSignalFragment = gql`
  fragment emitSignalFragment on EmitSignal {
    __typename
    signal {
      ...signalFragment
    }
    values {
      ...signalValuePairFragment
    }
  }
  ${signalFragment}
  ${signalValuePairFragment}
`;

export { emitSignalFragment };