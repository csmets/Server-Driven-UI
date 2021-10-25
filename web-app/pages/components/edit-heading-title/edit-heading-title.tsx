import { useMutation } from '@apollo/client';
import * as React from 'react';
import { UpdateHeadingDocument } from '../../../../generated-types/react/types';
import { SignalContext } from '../../provider/signal';

const EditHeadingTitle = () => {
  const [updateHeadingMutation, updateHeadingResponse] = useMutation(UpdateHeadingDocument);

  const signalContext = React.useContext(SignalContext);
  const { useResponseSignals } = signalContext;

  const onClick = () => {
    const inputValue = document.getElementById('headingValue')?.value;
    if (inputValue) {
      updateHeadingMutation({
        variables: {
          heading: inputValue,
          cacheId: 'heading'
        }
      })
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