import { gql } from "graphql-request";
import { containerFragment } from "./container";

const feedViewFragment = gql`
  fragment feedViewFragment on FeedView {
    elements {
      ...containerFragment
    }
  }
  ${containerFragment}
`

export { feedViewFragment };