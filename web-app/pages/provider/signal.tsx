import * as React from 'react';
interface SignalContext {
  registerSignal: (sub: Signal) => Subscribe
  emitSignal: (receivedSignal: EmitSignal) => void
  useResponseSignals: (response: EmitSignals) => void
}

interface Signal {
  signalId: string
}

interface EmitSignal {
  signalId: string
  key: string
  value?: string
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

  const signals: Signal[] = [];

  const registerSignal = (signal: Signal) => {
    signals.push(signal);

    return {
      subscribe
    }
  };

  const emitSignal = (value: EmitSignal) => {
    signals.forEach((signal) => {
      if (value.signalId === signal.signalId) {
        const result = {
          signalId: value.signalId,
          key: value.key,
          value: value.value
        };

        setSubscribe({ result });
      }
    });
  };

  const useResponseSignals = (response: EmitSignals) => {
    React.useEffect(() => {
      if (response?.signals) {
        response.signals.forEach((signal: any) => {
          const { signalId, key, value } = signal
          emitSignal({
            signalId,
            key,
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