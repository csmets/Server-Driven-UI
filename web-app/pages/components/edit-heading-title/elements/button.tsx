import * as React from 'react';
import { useAction } from '../../action';
import { ButtonData } from '../models/edit-heading-container-vm';

const Button = (props: { data: ButtonData }) => {
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
