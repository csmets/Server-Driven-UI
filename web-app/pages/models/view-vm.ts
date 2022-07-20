import { ContainerData, ContainerVM } from "./container-vm";

export type ViewElement = ContainerData;

export interface ViewData {
  elements: ViewElement[]
}

export class ViewVM implements ViewData {
  elements: ViewElement[];

  constructor(view: any) {
    this.elements = [];

    view?.elements?.forEach((el: any) => {
      switch (el.__typename) {
        case 'Container':
          this.elements.push(new ContainerVM(el))
          break;
      }
    });
  }
}
