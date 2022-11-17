import { EditNameSubmitActionData, EditNameSubmitActionVM } from "./actions/edit-name-submit-action";
import { FavouriteActionData, FavouriteActionVM } from "./actions/favourite-action";
import { URLActionData, URLActionVM } from "./actions/url-action";

export type Action = URLActionData | EditNameSubmitActionData | FavouriteActionData;

export const actionAdapter = (action: any): Action | undefined  => {
  switch(action?.__typename) {
    case "URLAction":
      return new URLActionVM(action);
    case "EditNameSubmitAction":
      return new EditNameSubmitActionVM(action);
    case "FavouriteAction":
      return new FavouriteActionVM(action);
    default:
      return undefined;
  }
}
