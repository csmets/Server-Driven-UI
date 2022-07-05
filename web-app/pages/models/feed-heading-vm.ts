import { SignalData, SignalVM } from "./signal-vm"

export interface FeedHeadingData {
  id: string
  primary: string
  signal?: SignalData
}

export class FeedHeadingVM implements FeedHeadingData {
  id: string;
  primary: string;
  signal?: SignalData

  constructor(feedHeading: any) {
    this.id = feedHeading.id
    this.primary = feedHeading.primary
    if (feedHeading?.signal) {
      this.signal = new SignalVM(feedHeading.signal)
    }
  }
}