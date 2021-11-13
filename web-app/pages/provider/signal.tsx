import { EmitSignal, Error, Signal, SignalType } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
interface SignalContext {
  useSignalEvent: (signal: Signal | null | undefined, callback: (result: any) => void) => void
  emitSignals: (emitSignals?: EmitSignal[] | null) => void
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

const SignalContext = React.createContext({} as SignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subscribers, setSubscribers] = React.useState([] as SubscribeResult[]);

  const signals: Signal[] = [];

  const registerSignal = (signal: Signal | null | undefined): Subscribe => {
    if (!signal) {
      return {
        subscribe: null
      }
    }

    signals.push(signal);

    if (signal.reference) {
      return {
        subscribe: subscribers.filter((s) => s.result.reference === signal.reference)[0]
      }
    }

    return {
      subscribe: subscribers.filter((s) => s.result.type === signal.type)[0]
    }

  };

  const useSignalEvent = (signal: Signal | null | undefined, callback: (result: any) => void) => {
    const { subscribe } = registerSignal(signal);

    React.useEffect(() => {
      /*
        When an event has been emitted to a signal you've subscribed to a result
        will be returned.
      */
      if (subscribe && subscribe.result) {
        if (signal?.reference && subscribe.result.reference && signal.reference === subscribe.result.reference) {
          // If there is a reference given in the signal and is matches the result; use callback
          callback(subscribe.result);
        }
        if (!signal?.reference && signal?.type === subscribe.result.type) {
          // If no reference is provided but signal type matches subscribe type; use callback.
          callback(subscribe.result);
        }
      }
    }, [subscribe]);
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

    setSubscribers(result);
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