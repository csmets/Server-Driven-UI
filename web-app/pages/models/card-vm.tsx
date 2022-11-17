import { Action, actionAdapter } from "./action-vm";
import { adaptButtons, Buttons } from "./buttons/buttons-vm";
import { ImageData, ImageVM } from "./image-vm";
import { SignalData, SignalVM } from "./signal-vm";

export interface CardData {
  primary: string
  secondaries: string[]
  action?: Action
  media?: ImageData
  links?: Buttons[]
  signal?: SignalData
  content?: string[]
}

export class CardVM implements CardData {
  primary: string;
  secondaries: string[];
  action?: Action;
  media?: ImageData;
  links?: Buttons[];
  signal?: SignalData;
  content?: string[];

  constructor(card: any) {
    this.primary = card?.primary;
    this.secondaries = card?.secondaries;
    this.action = actionAdapter(card?.action);
    this.media = card?.media && new ImageVM(card.media);
    this.links = card?.links && Array.isArray(card.links) &&
      card.links.map((link: any) => adaptButtons(link));
    this.signal = card?.signal && new SignalVM(card?.signal);
    this.content = card?.content
  }
}
