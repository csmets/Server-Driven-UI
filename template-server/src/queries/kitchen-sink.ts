import { gql } from "graphql-request";
import { kitchenSinkViewFragment } from "../fragments/kitchen-sink-view";

const kitchenSinkQuery = gql`
  query {
    kitchenSink {
      ...kitchenSinkViewFragment
    }
  }
  ${kitchenSinkViewFragment}
`;

export { kitchenSinkQuery }
