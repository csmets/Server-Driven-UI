import { HeadingVM } from "./heading-vm";
import { ParagraphData, ParagraphVM } from "./paragraph-vm";
import { CardData, CardVM } from "./card-vm";

export type ContainerElement = CardData | ParagraphData

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
        case "Paragraph":
          this.elements.push(new ParagraphVM(el));
          break;
        case "Heading":
          this.elements.push(new HeadingVM(el))
      }
    });
  }
}
