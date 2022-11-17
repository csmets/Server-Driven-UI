import { Action, Button, ButtonSize, ButtonTheme, ButtonVariant } from "../../types";

interface ButtonProps {
  icon?: string;
  label?: string;
  action?: Action;
  buttonSize?: ButtonSize;
  buttonTheme?: ButtonTheme;
  buttonVariant?: ButtonVariant;
  disableElevation: boolean;
  disabled: boolean;
}

export const button = (button: ButtonProps): Button => {
  const theme = button.buttonTheme || ButtonTheme.Primary;
  const size = button.buttonSize || ButtonSize.Medium;
  const variant = button.buttonVariant || ButtonVariant.Contained;
  return {
    __typename: 'Button',
    icon: button.icon,
    buttonVariant: variant,
    label: button.label,
    action: button.action,
    disabled: button.disabled,
    disableElevation: button.disableElevation,
    buttonTheme: theme,
    buttonSize: size
  };
}