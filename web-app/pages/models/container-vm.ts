import { BoxData, BoxVM } from "./box-vm";
import {ButtonData, ButtonVM} from "./button-vm";
import { CardData, CardVM } from "./card-vm";
import { TypographyData, TypographyVM } from "./typography-vm";

export type ContainerElement = CardData | TypographyData | BoxData | ButtonData

export enum ContainerType {
  FILL,
  COLUMN,
  ROW
}

export interface ContainerData {
  containerType: ContainerType
  elements: ContainerElement[]
}

export class ContainerVM implements ContainerData {
  containerType: ContainerType;
  elements: ContainerElement[];

  constructor(container: any) {
    this.elements = [];
    this.containerType = adaptContainerType(container?.containerType);

    container?.elements?.forEach((el: any) => {
      switch (el.__typename) {
        case "Card":
          this.elements.push(new CardVM(el));
          break;
        case "Typography":
          this.elements.push(new TypographyVM(el))
          break;
        case "Box":
          this.elements.push(new BoxVM(el))
          break;
        case "Button":
          this.elements.push(new ButtonVM(el))
          break;
      }
    });
  }
}

const adaptContainerType = (type: string): ContainerType => {
  switch (type) {
    case "FILL":
      return ContainerType.FILL;
    case "COLUMN":
      return ContainerType.COLUMN;
    case "ROW":
      return ContainerType.ROW;
    default:
      return ContainerType.FILL;
  }
}
