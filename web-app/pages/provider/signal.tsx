import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { EmitSignal, Error, Signal, SignalType, SignalValuePair } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
interface SignalContext {
  useSignalEvent: (signal: Signal | null | undefined, callback: (result: SubscribeResult) => void) => void
  emitSignals: (emitSignals: EmitSignal[], cache?: ApolloCache<NormalizedCacheObject>) => void
}

interface Subscribe {
  subscribe: SubscribeResult | null
  cacheSubscribe: SubscribeResult | null
}

interface Result {
  type: SignalType
  reference?: string
  values: SignalValuePair[]
}

interface SubscribeResult {
  result: Result
  cache?: ApolloCache<NormalizedCacheObject>
}

const SignalContext = React.createContext({} as SignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subscribers, setSubscribers] = React.useState([] as SubscribeResult[]);
  const [cacheSubscribers, setCacheSubscribers] = React.useState([] as SubscribeResult[]);

  const signalsRegistry = new Map<String, Signal>();

  const registerSignal = (signal: Signal | null | undefined): Subscribe => {
    if (!signal) {
      return {
        subscribe: null,
        cacheSubscribe: null
      }
    }

    const key = signal.type + signal.reference;

    if (!signalsRegistry.get(key)) {
      signalsRegistry.set(key, signal);
    }

    if (signal.reference) {
      return {
        subscribe: subscribers.filter((s) => s.result.reference === signal.reference)[0],
        cacheSubscribe: cacheSubscribers.filter((s) => s.result.reference === signal.reference)[0]
      }
    }

    return {
      subscribe: subscribers.filter((s) => s.result.type === signal.type)[0],
      cacheSubscribe: cacheSubscribers.filter((s) => s.result.type === signal.type)[0],
    }

  };

  const useSignalEvent = (signal: Signal | null | undefined, callback: (result: SubscribeResult) => void) => {
    const { subscribe, cacheSubscribe } = registerSignal(signal);

    React.useEffect(() => {
      /*
        When an event has been emitted to a signal you've subscribed to a result
        will be returned.
      */
      if (subscribe && subscribe.result) {
        if (signal?.reference && subscribe.result.reference && signal.reference === subscribe.result.reference) {
          // If there is a reference given in the signal and is matches the result; use callback
          callback(subscribe);
        }
        if (!signal?.reference && signal?.type === subscribe.result.type) {
          // If no reference is provided but signal type matches subscribe type; use callback.
          callback(subscribe);
        }
      }
    }, [subscribe]);

    React.useEffect(() => {
      /*
        When an event has been emitted to a signal you've subscribed to a result
        will be returned.
      */
     if (callback) {
       if (cacheSubscribe && cacheSubscribe.result) {
         if (signal?.reference && cacheSubscribe.result.reference && signal.reference === cacheSubscribe.result.reference) {
           // If there is a reference given in the signal and is matches the result; use callback
           callback(cacheSubscribe);
         }
         if (!signal?.reference && signal?.type === cacheSubscribe.result.type) {
           // If no reference is provided but signal type matches subscribe type; use callback.
           callback(cacheSubscribe);
         }
       }
     }
    }, [cacheSubscribe]);
  };

  const emitSignals = (emitSignals: EmitSignal[], cache?: ApolloCache<NormalizedCacheObject>) => {
    const result = [] as SubscribeResult[];

    emitSignals?.forEach((emitSignal) => {
      signalsRegistry.forEach((signal) => {
        if (emitSignal?.signal?.type === signal.type) {
          result.push({
            result: {
              type: emitSignal.signal.type,
              reference: emitSignal.signal.reference || undefined,
              values: emitSignal.values
            },
            cache
          });
        }
      })
    });

    if (cache) {
      setCacheSubscribers(result);
    } else {
      setSubscribers(result);
    }
  }

  const context = {
    useSignalEvent,
    emitSignals
  };

  return (
    <SignalContext.Provider value={context}>{children}</SignalContext.Provider>
  );
}

export {
  SignalContext,
  SignalProvider,
}
