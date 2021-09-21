import * as React from 'react';
import { EmitSignal } from '../../../generated-types/generated/types';

interface ISignalContext {
  signal: ISignal
  subscribeSignal: (sub: ISignalSub) => void
  emitSignal: (receivedSignal: IEmitSignal) => void
}

interface ISignal {
  id: string
  key: string
}

interface ISignalSub {
  id: string
}

interface IEmitSignal {
  id: string
  key: string
}

const SignalContext = React.createContext({} as ISignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [subSignal, subscribeSignal] = React.useState({} as ISignalSub);
  const [signal, setSignal] = React.useState({} as ISignal);

  const emitSignal = (value: IEmitSignal) => {
    if (value.id === subSignal.id) {
      setSignal({
        id: value.id,
        key: value.key
      });
    }
  }

  const context = {
    signal,
    subscribeSignal,
    emitSignal
  }

  return (
    <SignalContext.Provider value={context}>{children}</SignalContext.Provider>
  )
}

const useEmitSignal = (data: any) => {
  const signalContext = React.useContext(SignalContext);
  const { emitSignal } = signalContext;

  React.useEffect(() => {
    if (data) {
      const { signals } = data.save;
      emitSignal({
        id: signals[0].id,
        key: signals[0].key
      });
    }
  }, [data])
};

const useSignal = (callback: (signal: EmitSignal) => void) => {
  const signalContext = React.useContext(SignalContext);
  const { signal } = signalContext;

  React.useEffect(() => {
    if (signal) {
      return callback(signal as EmitSignal);
    }
  }, [signal]);

  return {};
};

export {
  SignalContext,
  SignalProvider,
  useEmitSignal,
  useSignal
}