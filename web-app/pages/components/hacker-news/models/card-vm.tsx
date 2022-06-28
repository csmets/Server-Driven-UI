import { Action, actionAdapter } from "./action-vm";

export interface CardData {
  primary: string
  secondaries: string[]
  action?: Action
}

export class CardVM implements CardData {
  primary: string;
  secondaries: string[];
  action?: Action;

  constructor(card: any) {
    this.primary = card?.primary;
    this.secondaries = card?.secondaries;
    this.action = actionAdapter(card?.action);
  }
}
