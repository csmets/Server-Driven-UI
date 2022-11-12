import { gql } from "graphql-request";
import { editNameContainerFragment } from "../fragments/edit-name-container";
import { favouriteActionFragment } from "../fragments/favourite-action";

const editNameQuery = gql`
  query {
    editName {
      ...editNameContainerFragment
    }
  }
  ${editNameContainerFragment}
  ${favouriteActionFragment}
`;

export { editNameQuery }