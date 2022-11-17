import { ButtonData, ButtonVM } from "./buttons/button-vm";

export type EditNameElement = TextInputData | ButtonData;

export interface TextInputData {
  formId: string
  placeholder?: string
}

export class TextInputVM implements TextInputData {
  formId: string;
  placeholder?: string

  constructor(textInput: any) {
    this.formId = textInput.formId
    this.placeholder = textInput?.placeholder
  }
}

export interface EditNameContainerData {
  elements: EditNameElement[]
}

export class EditNameContainerVM implements EditNameContainerData {
  elements: EditNameElement[];

  constructor(editNameContainer: any) {
    this.elements = [];
    if (editNameContainer?.elements?.length) {
      editNameContainer.elements.forEach((element: any) => {
        switch (element.__typename) {
          case 'TextInput':
            this.elements.push(new TextInputVM(element));
            break;
          case 'Button':
            this.elements.push(new ButtonVM(element));
            break;
        }
      });
    }
  }
}
