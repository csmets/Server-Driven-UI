import { EmitSignal, Error, Signal, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
interface SignalContext {
  registerSignal: (signal?: Signal | null) => Subscribe
  emitSignals: (emitSignals?: EmitSignal[] | null) => void
  useResponseSignals: (response: ResponseSignals) => void
}

interface Subscribe {
  subscribe: SubscribeResult | null
}

interface Result {
  type: SignalType
  reference?: string
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

  const registerSignal = (signal?: Signal | null) => {
    if (!signal) {
      return {
        subscribe: null
      }
    }

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

  const emitSignals = (emitSignals?: EmitSignal[] | null) => {
    const result = [] as SubscribeResult[];

    emitSignals?.forEach((emitSignal) => {
      signals.forEach((signal) => {
        if (emitSignal?.signal?.type === signal.type) {
          result.push({
            result: {
              type: emitSignal.signal.type,
              reference: emitSignal.signal.reference || undefined,
              value: emitSignal.value
            }
          });
        }
      })
    });

    setSubscribe(result);
  }

  const emitFallback = (fallbackSignals: Signal[]) => {
    const fallbacks = [] as EmitSignal[];
    fallbackSignals.forEach((fallback) => {
      signals.forEach((signal) => {
        if (fallback.reference === signal.reference) {
          fallbacks.push({
            signal,
            value: signal.fallback
          })
        }
      })
    })

    emitSignals(fallbacks)
  }

  const useResponseSignals = (response: ResponseSignals) => {
    React.useEffect(() => {
      if (response && response.error && response.error.signals) {
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