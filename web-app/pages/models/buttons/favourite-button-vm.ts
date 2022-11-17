import { Action, actionAdapter } from "../action-vm";
import { SignalData, SignalVM } from "../signal-vm";
import { adaptButtonSize, ButtonSize } from "./button-vm";

export interface FavouriteButtonData {
  action?: Action
  disabled: boolean,
  size: ButtonSize,
  signal?: SignalData,
  icon: string
}

export class FavouriteButtonVM implements FavouriteButtonData {
  action?: Action;
  disabled: boolean;
  size: ButtonSize;
  signal?: SignalData;
  icon: string;

  constructor(button: any) {
    this.action = actionAdapter(button.action);
    this.disabled = button.disabled;
    this.size = adaptButtonSize(button.buttonSize);
    this.signal = button?.signal && new SignalVM(button?.signal);
    this.icon = button?.icon;
  }
}