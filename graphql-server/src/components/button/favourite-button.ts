import { Action, ButtonSize, FavouriteButton, Signal } from "../../types";

interface FavouriteButtonProps {
  icon?: string;
  label?: string;
  action: Action;
  buttonSize?: ButtonSize;
  disabled: boolean;
  signal?: Signal;
}

export const favouriteButton = (button: FavouriteButtonProps): FavouriteButton => {
  const size = button.buttonSize || ButtonSize.Medium;
  return {
    __typename: 'FavouriteButton',
    label: button.label,
    icon: button.icon,
    action: button.action,
    disabled: button.disabled,
    buttonSize: size,
    signal: button?.signal
  };
}