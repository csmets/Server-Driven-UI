import * as React from 'react';
import { useMutation } from '@apollo/client';
import { Action, SignalType, UpdateHeadingDocument } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../provider/signal';

const useAction = (action: Action) => {
  const [updateHeadingMutation] = useMutation(UpdateHeadingDocument);
  const signalContext = React.useContext(SignalContext);
  const { emitSignals } = signalContext;

  switch (action.__typename) {
    case 'EditNameSubmitAction':
      const onClick = () => {
        const inputValues = action.inputIds.map((input) => {
          const value = document.getElementById(input)?.value;
          return {
            key: input,
            value
          }
        });
        const cacheIds = action.cacheIds.map((cache) => {
          return {
            key: cache.key,
            value: cache.value
          }
        })

        if (inputValues) {
          updateHeadingMutation({
            variables: {
              formInputs: inputValues,
              cacheIds
            }
          })

          emitSignals([{
            signal: action.emitSignal.signal,
            value: {
              text: inputValues[0].value
            }
          }])
        }
      }
      return {
        onClick
      }
    default:
      return null;
  }
}

export { useAction };