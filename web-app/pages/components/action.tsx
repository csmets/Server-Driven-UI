import * as React from 'react';
import { gql, useMutation } from '@apollo/client';
import { SignalContext } from '../provider/signal';
import { SignalStringValueVM, SignalValuePairKey } from '../models/signal-vm';
import { Action } from '../models/action-vm';
import { FavouriteActionVM } from '../models/actions/favourite-action';
import { EditNameSubmitActionVM } from '../models/actions/edit-name-submit-action';

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

const saveItemMutationQuery = gql`
  mutation saveItem($feedId: String!) {
      save(feedId: $feedId) {
        success
        error {
          message
        }
      }
  }
`;

const useAction = (action: Action, stateHandler?: { value: any, setValue: any}) => {
  const [updateHeadingMutation] = useMutation(updateHeadingMutationQuery);
  const [saveItemMutation] = useMutation(saveItemMutationQuery);
  const signalContext = React.useContext(SignalContext);
  const { emitSignals } = signalContext;
  const value = stateHandler?.value;
  const setValue = stateHandler?.setValue;

  if (action instanceof EditNameSubmitActionVM) {
      const onClick = () => {
        const inputValues = action.inputIds.map((input) => {
          const elValue = (document.getElementById(input) as HTMLInputElement).value;
          return {
            key: input,
            value: elValue
          }
        });

        if (inputValues) {
          // Render optimistic view
          emitSignals([{
            signal: action.emitSignal.signal,
            values: [{
              key: SignalValuePairKey.Primary,
              value : new SignalStringValueVM({ text: inputValues[0].value })
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
                  value : new SignalStringValueVM({ text: inputValues[0].value })
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

  if (action instanceof FavouriteActionVM) {
    const onClick = () => {
      const feedId = action?.feedId || "";
      saveItemMutation({
        variables: { feedId },
        update(cache, _) {
          if (value) {
            action?.unsave && emitSignals(action.unsave, cache)
          } else {
            action?.save && emitSignals(action?.save, cache)
          }
        }
      });

      if (value) {
        action?.unsave && emitSignals(action.unsave)
      } else {
        action?.save && emitSignals(action?.save)
      }

      setValue(!value);
    }

    return {
      onClick
    }
  }

  return null;
}

export { useAction };
