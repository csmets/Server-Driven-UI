import { gql } from "graphql-request";
import { paragraphFragment } from "./paragraph";

const typographyContentFragment = gql`
  fragment typographyContentFragment on TypographyContent {
    __typename
    paragraph {
      ...paragraphFragment
    }
  }
  ${paragraphFragment}
`;

export { typographyContentFragment };