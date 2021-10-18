import { SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
interface SignalContext {
  registerSignal: (sub: Signal) => Subscribe
  emitSignal: (receivedSignal: EmitSignal) => void
  useResponseSignals: (response: EmitSignals) => void
}

export interface Signal {
  type: SignalType
  reference: string
}

interface EmitSignal {
  signal: Signal
  value: any
}

interface Subscribe {
  subscribe: SubscribeResult
}

interface Result {
  reference: string
  value: any
}

interface SubscribeResult {
  result: Result
}

interface EmitSignals {
  emitSignals: EmitSignal[]
}

const SignalContext = React.createContext({} as SignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subscribe, setSubscribe] = React.useState({} as SubscribeResult);

  const signals: Signal[] = [];

  const registerSignal = (signal: Signal) => {
    signals.push(signal);

    return {
      subscribe
    }
  };

  const emitSignal = (value: EmitSignal) => {
    signals.forEach((signal) => {
      if (value.signal.type === signal.type) {
        const result = {
          reference: value.signal.reference,
          value: value.value
        };

        setSubscribe({ result });
      }
    });
  };

  const useResponseSignals = (response: EmitSignals) => {
    React.useEffect(() => {
      if (response?.emitSignals) {
        response.emitSignals.forEach((signalObj: EmitSignal) => {
          emitSignal(signalObj);
        });
      }
    }, [response])
  }

  const context = {
    registerSignal,
    emitSignal,
    useResponseSignals
  };

  return (
    <SignalContext.Provider value={context}>{children}</SignalContext.Provider>
  );
}

export {
  SignalContext,
  SignalProvider,
}