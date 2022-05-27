import { gql } from "graphql-request";

const feedHeadingFragment = gql`
  fragment feedHeadingFragment on FeedHeading {
    __typename
    id
    primary
    signal {
      ...signalFragment
    }
  }
`;

export { feedHeadingFragment };