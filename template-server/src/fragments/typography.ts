import { gql } from "graphql-request";

export const typographyFragment = gql`
  fragment typographyFragment on Typography {
    __typename
    typographyVariant
    typographyTheme
    value
  }
`;
