import { ContainerData, ContainerVM } from "./container-vm"

export type KitchenSinkElement = ContainerData;

export interface KitchenSinkViewData {
  elements: KitchenSinkElement[]
}

export class KitchenSinkViewVM implements KitchenSinkViewData {
  elements: KitchenSinkElement[];

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
