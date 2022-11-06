import { gql } from "graphql-request";

export const boxFragment = gql`
  fragment boxFragment on Box {
    __typename
    _debugColor
    width
    height
  }
`;
