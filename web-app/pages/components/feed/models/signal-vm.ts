export interface SignalData {
  reference?: string
  type: SignalType;
}

export interface EmitSignalData {
  signal: SignalData
  values?: SignalValuePairData[]
}

export interface SignalValuePairData {
  key: string
  value: string
}

export enum SignalType {
  Error = 'ERROR',
  Favourite = 'FAVOURITE',
  FavouriteCount = 'FAVOURITE_COUNT',
  Title = 'TITLE',
  Toggle = 'TOGGLE'
}

export enum SignalValuePairKey {
  Count = 'COUNT',
  Icon = 'ICON',
  Primary = 'PRIMARY'
}

export class SignalVM implements SignalData {
  reference?: string;
  type: SignalType;

  constructor(signal: any) {
    this.reference = signal.reference
    this.type = signal.type
  }
}

export class EmitSignalVM implements EmitSignalData {
  signal: SignalData;
  values?: SignalValuePairData[];

  constructor(emitSignal: any) {
    this.signal = new SignalVM(emitSignal.signal);
    if (emitSignal?.values) {
      this.values = []
      emitSignal?.values?.forEach((v: any) => {
        this.values?.push(new SignalValuePairVM(v))
      })
    }
  }
}

export class SignalValuePairVM implements SignalValuePairData {
  key: string;
  value: string;

  constructor(signalPairValue: any) {
    this.key = signalPairValue.key
    this.value = signalPairValue.value
  }
}