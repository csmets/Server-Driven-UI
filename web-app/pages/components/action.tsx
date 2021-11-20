import * as React from 'react';
import { useMutation } from '@apollo/client';
import { Action, UpdateHeadingDocument } from '@csmets/typescript-apollo-sdui-types/types';
import { SignalContext } from '../provider/signal';

const useAction = (action: Action) => {
  const [updateHeadingMutation] = useMutation(UpdateHeadingDocument);
  const signalContext = React.useContext(SignalContext);
  const { emitSignals, emitSignalsCache } = signalContext;

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

        if (inputValues) {
          // Render optimistic view
          emitSignals([{
            signal: action.emitSignal.signal,
            value: {
              text: inputValues[0].value
            }
          }]);

          updateHeadingMutation({
            variables: {
              formInputs: inputValues
            },
            update(cache, _){
              // Emit signal but this time to update the cache
              emitSignalsCache([{
                signal: action.emitSignal.signal,
                value: {
                  text: inputValues[0].value
                }
              }], cache)
            }
          });
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
