import * as React from 'react';
import {
  ButtonData,
  ButtonSize,
  ButtonTheme,
  ButtonVariant
} from '../models/buttons/button-vm';
import { useAction } from './action';
import { Button as ButtonComponent } from "@mui/material";

const Button = (props: { data: ButtonData }) => {
  const { data } = props;
  const action = data.action && useAction(data.action);

  if (!data) {
    return <></>
  }

  return (
    <ButtonComponent
      onClick={action?.onClick}
      variant={adaptButtonVariant(data.variant)}
      disabled={data.disabled}
      disableElevation={data.disableElevation}
      color={adaptButtonThemeColor(data.theme)}
      size={adaptButtonSize(data.size)}
    >
      {data?.icon && <img src={data.icon} alt="" width="20px" height="20px" />}
      {data.label}
    </ButtonComponent>
  )
}

const adaptButtonVariant = (
  variant: ButtonVariant
): "text" | "contained" | "outlined" => {
  switch (variant) {
    case ButtonVariant.TEXT:
      return "text";
    case ButtonVariant.CONTAINED:
      return "contained";
    case ButtonVariant.OUTLINED:
      return "outlined";
    default:
      return "contained";
  }
}

const adaptButtonThemeColor = (
  theme: ButtonTheme
): "primary" | "secondary" | "success" | "error" => {
  switch (theme) {
    case ButtonTheme.PRIMARY:
      return "primary";
    case ButtonTheme.SECONDARY:
      return "secondary";
    case ButtonTheme.SUCCESS:
      return "success";
    case ButtonTheme.ERROR:
      return "error";
    default:
      return "primary";
  }
}

export const adaptButtonSize = (
  size: ButtonSize
): "small" | "medium" | "large" => {
  switch (size) {
    case ButtonSize.SMALL:
      return "small";
    case ButtonSize.MEDIUM:
      return "medium";
    case ButtonSize.LARGE:
      return "large";
    default:
      return "medium";
  }
}

export { Button };
