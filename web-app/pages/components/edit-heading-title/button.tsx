import { ButtonFragment } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
import { useAction } from '../action';

const Button = (props: { data: ButtonFragment }) => {
  const { data } = props;
  const action = useAction(data.action)

  if (!data) {
    return <></>
  }

  return (
    <button onClick={action?.onClick}>{data.label}</button>
  )
}

export { Button };