import * as React from 'react';
interface SignalContext {
  registerSignal: (sub: String) => Subscribe
  emitSignal: (receivedSignal: EmitSignal) => void
  useResponseSignals: (response: EmitSignals) => void
}

interface EmitSignal {
  signal: string
  value: any
}

interface Subscribe {
  subscribe: SubscribeResult
}

interface SubscribeResult {
  result: any
}

interface EmitSignals {
  signals: EmitSignal[]
}

const SignalContext = React.createContext({} as SignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subscribe, setSubscribe] = React.useState({} as SubscribeResult);

  const signals: String[] = [];

  const registerSignal = (signal: String) => {
    signals.push(signal);

    return {
      subscribe
    }
  };

  const emitSignal = (value: EmitSignal) => {
    signals.forEach((signal) => {
      if (value.signal === signal) {
        const result = {
          signal: value.signal,
          value: value.value
        };

        setSubscribe({ result });
      }
    });
  };

  const useResponseSignals = (response: EmitSignals) => {
    React.useEffect(() => {
      if (response?.signals) {
        response.signals.forEach((signalObj: any) => {
          const { signal, value } = signalObj
          emitSignal({
            signal,
            value
          })
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