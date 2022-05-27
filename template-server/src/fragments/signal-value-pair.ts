import { gql } from "graphql-request";

const signalValuePairFragment = gql`
  fragment signalValuePairFragment on SignalValuePair {
    __typename
    key
    value
  }
`;

export { signalValuePairFragment };