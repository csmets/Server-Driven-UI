import { Action, actionAdapter } from "./action-vm";

export enum ButtonVariant {
  TEXT,
  CONTAINED,
  OUTLINED
}

export enum ButtonTheme {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  ERROR
}

export enum ButtonSize {
  SMALL,
  MEDIUM,
  LARGE
}

export interface ButtonData {
  label: string
  action?: Action
  variant: ButtonVariant,
  disabled: boolean,
  disableElevation: boolean,
  theme: ButtonTheme,
  size: ButtonSize
}

export class ButtonVM implements ButtonData {
  label: string;
  action?: Action;
  variant: ButtonVariant;
  disabled: boolean;
  disableElevation: boolean;
  theme: ButtonTheme;
  size: ButtonSize;

  constructor(button: any) {
    this.label = button.label;
    this.action = actionAdapter(button.action);
    this.variant = adaptButtonVariant(button.variant);
    this.disabled = button.disabled;
    this.disableElevation = button.disableElevation;
    this.theme = adaptButtonTheme(button.theme);
    this.size = adaptButtonSize(button.size);
  }
}

const adaptButtonVariant = (variant: string): ButtonVariant => {
  switch (variant) {
    case "TEXT":
      return ButtonVariant.TEXT;
    case "CONTAINED":
      return ButtonVariant.CONTAINED;
    case "OUTLINED":
      return ButtonVariant.OUTLINED;
    default:
      return ButtonVariant.CONTAINED;
  }
};

const adaptButtonTheme = (theme: string): ButtonTheme => {
  switch (theme) {
    case "PRIMARY":
      return ButtonTheme.PRIMARY;
    case "SECONDARY":
      return ButtonTheme.SECONDARY;
    case "SUCCESS":
      return ButtonTheme.SUCCESS;
    case "ERROR":
      return ButtonTheme.ERROR;
    default:
      return ButtonTheme.PRIMARY;
  }
};

const adaptButtonSize = (size: string): ButtonSize => {
  switch (size) {
    case "SMALL":
      return ButtonSize.SMALL;
    case "MEDIUM":
      return ButtonSize.MEDIUM;
    case "LARGE":
      return ButtonSize.LARGE;
    default:
      return ButtonSize.MEDIUM;
  }
};
