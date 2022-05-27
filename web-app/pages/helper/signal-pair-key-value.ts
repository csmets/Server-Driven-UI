import { SignalValuePairData, SignalValuePairKey } from "../components/feed/models/signal-vm"

const signalPairKeyValue = (key: SignalValuePairKey, values: SignalValuePairData[]): string | null => {
  const matchedKey = values?.filter((signalValuePair) => signalValuePair.key === key)
  return matchedKey.length ? matchedKey[0].value : null;
}

export {
  signalPairKeyValue
}