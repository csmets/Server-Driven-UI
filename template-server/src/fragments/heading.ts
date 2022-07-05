import { gql } from "graphql-request";

export const headingFragment = gql`
  fragment headingFragment on Heading {
    __typename
    type
    value
  }
`;
