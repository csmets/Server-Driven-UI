export interface SignalData {
  reference?: string
  type: SignalType;
}

export interface EmitSignalData {
  signal: SignalData
  values?: SignalValuePairData[]
}

export interface SignalValuePairData {
  key: SignalValuePairKey
  value: SignalValuePairValue
}

export interface SignalStringValueData {
  text: string
}

export interface SignalArrayValueData {
  prefix?: [string]
  suffix?: [string]
  array: [string]
}

export type SignalValuePairValue = SignalStringValueData | SignalArrayValueData;

export enum SignalType {
  Error = 'ERROR',
  Title = 'TITLE',
  Toggle = 'TOGGLE',
  Update = 'UPDATE'
}

export enum SignalValuePairKey {
  Content = 'CONTENT',
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
  key: SignalValuePairKey;
  value: SignalValuePairValue;

  constructor(signalPairValue: any) {
    this.key = signalPairValue.key
    this.value = this.handleValue(signalPairValue.value)
  }

  private handleValue(value: any): SignalValuePairValue {
    switch (value.__typename) {
      case 'SignalStringValue':
        return new SignalStringValueVM(value);
      case 'SignalArrayValue':
        return new SignalArrayValueVM(value);
      default:
        // Value will always be returned but incase something changes default
        // is to return an empty string
        return new SignalStringValueVM('');
    }
  }
}

export class SignalStringValueVM implements SignalStringValueData {
  text: string;

  constructor(signalStringValue: any) {
    this.text = signalStringValue.text
  }
}

export class SignalArrayValueVM implements SignalArrayValueData {
  suffix?: [string];
  prefix?: [string];
  array: [string];

  constructor(signalArrayValue: any) {
    this.suffix = signalArrayValue.suffix;
    this.prefix = signalArrayValue.prefix;
    this.array = signalArrayValue.array;
  }
}