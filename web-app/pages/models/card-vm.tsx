import { Action, actionAdapter } from "./action-vm";
import { ButtonData } from "./button-vm";
import { ImageData, ImageVM } from "./image-vm";

export interface CardData {
  primary: string
  secondaries: string[]
  action?: Action
  media?: ImageData
  links?: ButtonData[]
}

export class CardVM implements CardData {
  primary: string;
  secondaries: string[];
  action?: Action;
  media?: ImageData;
  links?: ButtonData[];

  constructor(card: any) {
    this.primary = card?.primary;
    this.secondaries = card?.secondaries;
    this.action = actionAdapter(card?.action);
    this.media = card?.media && new ImageVM(card.media);
    this.links = card?.links;
  }
}
