import { Error, SignalType, SignalValue } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
interface SignalContext {
  registerSignal: (sub: Signal) => Subscribe
  emitSignals: (emitSignals: EmitSignal[]) => void
  useResponseSignals: (response: ResponseSignals) => void
}

export interface Signal {
  type: SignalType
  reference: string
  fallback?: any
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

interface ResponseSignals {
  error: Error
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

  const emitSignals = (emitSignals: EmitSignal[]) => {
    const result = [] as SubscribeResult[];

    emitSignals.forEach((emitSignal) => {
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

  const emitFallback = (fallbackSignals: Signal[]) => {
    fallbackSignals.forEach((fallback) => {
      signals.forEach((signal) => {
        if (fallback.reference === signal.reference) {
          emitSignals([{signal, value: signal.fallback}])
        }
      })
    })
  }

  const useResponseSignals = (response: ResponseSignals) => {
    React.useEffect(() => {
      if (response.error && response.error.signals) {
        const fallbackSignals = response.error.signals.map((sig) => {
          return {
            type: sig.type,
            reference: sig.reference
          } as Signal
        })
        emitFallback(fallbackSignals)
      }
      else if (response?.emitSignals) {
        emitSignals(response.emitSignals)
      }
    }, [response])
  }

  const context = {
    registerSignal,
    emitSignals,
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