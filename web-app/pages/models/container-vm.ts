import { BoxData, BoxVM } from "./box-vm";
import { CardData, CardVM } from "./card-vm";
import { TypographyData, TypographyVM } from "./typography-vm";

export type ContainerElement = CardData | TypographyData | BoxData

export interface ContainerData {
  elements: ContainerElement[]
}

export class ContainerVM implements ContainerData {
  elements: ContainerElement[]

  constructor(container: any) {
    this.elements = []

    container?.elements?.forEach((el: any) => {
      switch (el.__typename) {
        case "Card":
          this.elements.push(new CardVM(el));
          break;
        case "Typography":
          this.elements.push(new TypographyVM(el))
        case "Box":
          this.elements.push(new BoxVM(el))
      }
    });
  }
}
