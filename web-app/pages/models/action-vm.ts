import {
  EditNameSubmitActionData,
  EditNameSubmitActionVM
} from "./edit-heading-container-vm";

export type Action = URLActionData | EditNameSubmitActionData;

export interface URLActionData {
  url: string
  description?: string
}

export class URLActionVM implements URLActionData {
  url: string
  description?: string

  constructor(action: any) {
    this.url = action?.url;
    this.description = action?.description;
  }
}

export const actionAdapter = (action: any): Action | undefined  => {
  switch(action?.__typename) {
    case "URLAction":
      return new URLActionVM(action);
    case "EditNameSubmitAction":
      return new EditNameSubmitActionVM(action);
    default:
      return undefined;
  }
}
