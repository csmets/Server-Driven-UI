import * as React from 'react';

const SignalContext = React.createContext({} as ISignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const emptySubSignal: ISignalSub = {
    id: "",
  }
  const [subSignal, subscribeSignal] = React.useState(emptySubSignal);
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

export {
  SignalContext,
  SignalProvider
}