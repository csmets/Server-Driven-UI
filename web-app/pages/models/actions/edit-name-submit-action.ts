import { EmitSignalData, EmitSignalVM } from "../signal-vm";

export interface EditNameSubmitActionData {
  inputIds: string[]
  emitSignal: EmitSignalData
}

export class EditNameSubmitActionVM implements EditNameSubmitActionData {
  inputIds: string[];
  emitSignal: EmitSignalData;

  constructor(action: any) {
    this.inputIds = action.inputIds;
    this.emitSignal = new EmitSignalVM(action.emitSignal);
  }
}
