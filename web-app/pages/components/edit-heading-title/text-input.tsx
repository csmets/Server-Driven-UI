import * as React from 'react';
import { TextInputData } from './models/edit-heading-container-vm';

const TextInput = (props: { data: TextInputData }) => {
  const { data } = props;

  if (!data) {
    return <></>
  }

  return (
    <input type="text" placeholder={data.placeholder || ''} id={data.formId} />
  )
}

export { TextInput };