import { SignalValuePair, SignalValuePairKey } from '@csmets/typescript-apollo-sdui-types/types';

const signalPairKeyValue = (key: SignalValuePairKey, values: SignalValuePair[]): string => {
  const matchedKey = values.filter((signalValuePair) => signalValuePair.key === key)
  return matchedKey[0].value
}

export {
  signalPairKeyValue
}