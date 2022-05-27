import { gql } from "graphql-request";

export const textInputFragment = gql`
  fragment textInputFragment on TextInput {
    __typename
    formId
    placeholder
  }
`;