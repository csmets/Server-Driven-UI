import { gql } from "graphql-request";

export const imageFragment = gql`
fragment imageFragment on Image {
  __typename
  url
  alt
}
`;
