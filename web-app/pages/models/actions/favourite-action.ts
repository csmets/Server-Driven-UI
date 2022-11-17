import { EmitSignalData, EmitSignalVM } from "../signal-vm";

export interface FavouriteActionData {
  feedId: string
  save?: EmitSignalData[]
  unsave?: EmitSignalData[]
}

export class FavouriteActionVM implements FavouriteActionData {
  feedId: string;
  save?: EmitSignalData[];
  unsave?: EmitSignalData[];

  constructor(action: any) {
    this.feedId = action.feedId;
    if (action.save?.length) {
      this.save = [];
      action.save.forEach((a: any) => {
        this.save?.push(new EmitSignalVM(a));
      })
    }

    if (action.unsave?.length) {
      this.unsave = [];
      action.unsave.forEach((ua: any) => {
        this.unsave?.push(new EmitSignalVM(ua));
      })
      this.unsave?.push;
    }
  }
}
