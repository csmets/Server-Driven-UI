import { gql } from "graphql-request";
import { editNameContainerFragment } from "../fragments/edit-name-container";

const editNameQuery = gql`
  query {
    editName {
      ...editNameContainerFragment
    }
  }
  ${editNameContainerFragment}
`;

export { editNameQuery }