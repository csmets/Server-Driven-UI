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
  type: SignalType
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
  const [subscribe, setSubscribe] = React.useState([] as SubscribeResult[]);

  const signals: Signal[] = [];

  const registerSignal = (signal: Signal) => {
    signals.push(signal);

    if (signal.reference) {
      return {
        subscribe: subscribe.filter((s) => s.result.reference === signal.reference)[0]
      }
    }

    return {
      subscribe: subscribe.filter((s) => s.result.type === signal.type)[0]
    }

  };

  const emitSignal = (value: EmitSignal) => {
    const result = [] as SubscribeResult[];

    signals.forEach((signal) => {
      if (value.signal.type === signal.type) {
        result.push({
          result: {
            type: value.signal.type,
            reference: value.signal.reference,
            value: value.value
          }
        });
      }
    });

    setSubscribe(result);
  };

  const emitSignals = (value: EmitSignal[]) => {
    const result = [] as SubscribeResult[];

    value.forEach((emitSignal) => {
      signals.forEach((signal) => {
        if (emitSignal.signal.type === signal.type) {
          result.push({
            result: {
              type: emitSignal.signal.type,
              reference: emitSignal.signal.reference,
              value: emitSignal.value
            }
          });
        }
      })
    });

    setSubscribe(result);
  }

  const useResponseSignals = (response: EmitSignals) => {
    React.useEffect(() => {
      if (response?.emitSignals) {
        emitSignals(response.emitSignals)
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