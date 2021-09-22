import * as React from 'react';
interface ISignalContext {
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
  key: string,
  cb: (signal: any) => void
}

const SignalContext = React.createContext({} as ISignalContext);

const SignalProvider = (props: any) => {
  const { children } = props;
  const [signal, subscribeSignal] = React.useState({} as ISignalSub);

  const emitSignal = (value: IEmitSignal) => {
    if (value.id === signal.id) {
      value.cb({
        id: value.id,
        key: value.key
      });
    }
  }

  const context = {
    subscribeSignal,
    emitSignal
  }

  return (
    <SignalContext.Provider value={context}>{children}</SignalContext.Provider>
  )
}

export {
  SignalContext,
  SignalProvider,
}