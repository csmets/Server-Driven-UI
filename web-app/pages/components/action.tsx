import * as React from 'react';
import { gql, useMutation } from '@apollo/client';
import { SignalContext } from '../provider/signal';
import { Action, EditNameSubmitActionVM } from './edit-heading-title/models/edit-heading-container-vm';
import { SignalValuePairKey } from './feed/models/signal-vm';

const updateHeadingMutationQuery = gql`
  mutation updateHeading($formInputs: [FormInput!]) {
    updateHeading(formInputs: $formInputs) {
      success
      error {
        message
      }
    }
  }
`

const useAction = (action: Action) => {
  const [updateHeadingMutation] = useMutation(updateHeadingMutationQuery);
  const signalContext = React.useContext(SignalContext);
  const { emitSignals } = signalContext;

  if (action instanceof EditNameSubmitActionVM) {
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
            values: [{
              key: SignalValuePairKey.Primary,
              value : inputValues[0].value
            }]
          }]);

          updateHeadingMutation({
            variables: {
              formInputs: inputValues
            },
            update(cache, _){
              // Emit signal but this time to update the cache
              emitSignals([{
                signal: action.emitSignal.signal,
                values: [{
                  key: SignalValuePairKey.Primary,
                  value: inputValues[0].value
                }]
              }], cache)
            }
          });
        }
      }
      return {
        onClick
      }
  }
  return null;
}

export { useAction };
