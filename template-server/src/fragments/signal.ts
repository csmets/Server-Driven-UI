import { gql } from "graphql-request";

const signalFragment = gql`
  fragment signalFragment on Signal {
    __typename
    type
    reference
  }
`;

export { signalFragment };