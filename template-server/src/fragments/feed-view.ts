import { gql } from "graphql-request";
import { containerFragment } from "./container";

const feedViewFragment = gql`
  fragment feedViewFragment on FeedView {
    __typename
    elements {
      ...containerFragment
    }
  }
  ${containerFragment}
`

export { feedViewFragment };