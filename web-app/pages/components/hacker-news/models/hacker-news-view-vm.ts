import {ContainerData, ContainerVM} from "./container-vm"

export type HackerNewsViewElement = ContainerData;

export interface HackerNewsViewData {
  elements: HackerNewsViewElement[]
}

export class HackerNewsViewVM implements HackerNewsViewData {
  elements: HackerNewsViewElement[];

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
