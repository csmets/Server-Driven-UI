import { gql } from "graphql-request";

export const typographyFragment = gql`
  fragment typographyFragment on Typography {
    __typename
    variant
    value
    theme
  }
`;
