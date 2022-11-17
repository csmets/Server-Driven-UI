import { gql } from "graphql-request";

const signalValuePairFragment = gql`
  fragment signalValuePairFragment on SignalValuePair {
    __typename
    key
    value {
      ...signalStringValueFragment
      ...signalArrayValueFragment
    }
  }

  fragment signalStringValueFragment on SignalStringValue {
    __typename
    text
  }

  fragment signalArrayValueFragment on SignalArrayValue {
    __typename
    prefix
    suffix
    array
  }
`;

export { signalValuePairFragment };