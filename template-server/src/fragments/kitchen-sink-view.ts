import { gql } from "graphql-request";
import { containerFragment } from "./container";

const kitchenSinkViewFragment = gql`
  fragment kitchenSinkViewFragment on KitchenSinkView {
    elements {
      ...containerFragment
    }
  }
  ${containerFragment}
`;

export { kitchenSinkViewFragment }
