import * as React from 'react';
import { ContainerVM } from '../models/container-vm';
import { ViewData } from '../models/view-vm';
import { Container } from './container';

export const View = (props: { data: ViewData }): JSX.Element => {
  const elements = props.data?.elements?.map((el, index) => {
    if (el instanceof ContainerVM) {
      return <Container key={`view-container-${index}`} data={el} />
    }
    return <></>
  })

  return (
    <div>
      {elements}
    </div>
  );
};
