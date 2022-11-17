import { SignalValuePairData, SignalValuePairKey, SignalValuePairValue } from "../models/signal-vm"

const signalPairKeyValue = (key: SignalValuePairKey, values: SignalValuePairData[]): SignalValuePairValue | null => {
  const matchedKey = values?.filter((signalValuePair) => signalValuePair.key === key)
  return matchedKey.length ? matchedKey[0].value : null;
}

export {
  signalPairKeyValue
}