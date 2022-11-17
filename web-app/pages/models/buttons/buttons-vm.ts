import { ButtonData, ButtonVM } from "./button-vm";
import { FavouriteButtonData, FavouriteButtonVM } from "./favourite-button-vm";

export type Buttons = ButtonData | FavouriteButtonData;

export function adaptButtons(button: any): Buttons | null {
  switch (button?.__typename) {
    case 'Button':
      return new ButtonVM(button);
    case 'FavouriteButton':
      return new FavouriteButtonVM(button);
    default:
      return null;
  }
}