import { TextInputFragment } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';

const TextInput = (props: { data: TextInputFragment}) => {
  const { data } = props;

  if (!data) {
    return <></>
  }

  return (
    <input type="text" placeholder={data.placeholder || ''} id={data.formId} />
  )
}

export { TextInput };