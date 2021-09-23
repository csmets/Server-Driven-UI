import * as React from 'react';
interface ISignalContext {
  registerSignal: (sub: ISignal) => ISubscribe
  emitSignal: (receivedSignal: IEmitSignal) => void
}

interface ISignal {
  signalId: string
}

interface IEmitSignal {
  signalId: string
  key: string
}

interface ISubscribe {
  subscribe: ISubscribeResult
}

interface ISubscribeResult {
  result: any
}

const SignalContext = React.createContext({} as ISignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subscribe, setSubscribe] = React.useState({} as ISubscribeResult);

  const signals: ISignal[] = [];

  const registerSignal = (signal: ISignal) => {
    signals.push(signal);

    return {
      subscribe
    }
  };

  const emitSignal = (value: IEmitSignal) => {
    signals.forEach((signal) => {
      if (value.signalId === signal.signalId) {
        const result = {
          signalId: value.signalId,
          key: value.key
        };

        setSubscribe({ result });
      }
    });
  };

  const context = {
    registerSignal,
    emitSignal
  };

  return (
    <SignalContext.Provider value={context}>{children}</SignalContext.Provider>
  );
}

export {
  SignalContext,
  SignalProvider,
}