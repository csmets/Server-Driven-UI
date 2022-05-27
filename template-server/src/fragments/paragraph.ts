import { gql } from "graphql-request";

const paragraphFragment = gql`
  fragment paragraphFragment on Paragraph {
    __typename
    value
  }
`;

export { paragraphFragment };