import { useMutation } from '@apollo/client';
import * as React from 'react';
import { UpdateHeadingDocument } from '../../../../generated-types/react/types';
import { SignalContext } from '../../provider/signal';
import { SignalType } from '@csmets/typescript-apollo-sdui-types/types';

const EditHeadingTitle = () => {
  const [updateHeadingMutation, updateHeadingResponse] = useMutation(UpdateHeadingDocument);

  const signalContext = React.useContext(SignalContext);
  const { emitSignals } = signalContext;

  const onClick = () => {
    const inputValue = document.getElementById('headingValue')?.value;
    if (inputValue) {
      updateHeadingMutation({
        variables: {
          heading: inputValue,
          cacheIds: [
            {
              "key": "heading",
              "value": "heading"
            }
          ]
        }
      })

      emitSignals([{
        signal: {
          type: SignalType.Title,
          reference: ''
        },
        value: {
          text: inputValue
        }
      }])
    }
  }

  return (
    <div>
      <input id="headingValue" type="text" placeholder="Updating heading title"/>
      <button onClick={onClick}>Submit</button>
    </div>
  )
};

export {
  EditHeadingTitle
}