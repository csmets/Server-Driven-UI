import { Action, Button, ButtonSize, ButtonTheme, ButtonVariant } from "../../types";

interface ButtonProps {
  action?: Action;
  buttonSize?: ButtonSize;
  buttonTheme?: ButtonTheme;
  buttonVariant?: ButtonVariant;
  disableElevation: boolean;
  disabled: boolean;
  label: string;
}

export const button = (button: ButtonProps): Button => {
  const theme = button.buttonTheme || ButtonTheme.Primary;
  const size = button.buttonSize || ButtonSize.Medium;
  const variant = button.buttonVariant || ButtonVariant.Contained;
  return {
    buttonVariant: variant,
    label: button.label,
    action: button.action,
    disabled: button.disabled,
    disableElevation: button.disableElevation,
    buttonTheme: theme,
    buttonSize: size
  };
}