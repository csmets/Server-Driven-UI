import { EditNameContainerFragment } from '@csmets/typescript-apollo-sdui-types/types';
import * as React from 'react';
import { Button } from './button';
import { TextInput } from './text-input';

const EditNameContainer = (props: { data: EditNameContainerFragment }) => {

  const { data } = props;

  if (!data || !data.elements) {
    return <></>
  }

  const editNameElements = data.elements.map((element, index) => {
    switch (element.__typename) {
      case 'Button':
        return <Button data={element}/>;
      case 'TextInput':
        return <TextInput data={element}/>;
      default:
        return <></>;
    }
  })

  return (
    <div>
      {editNameElements}
    </div>
  )
}

export { EditNameContainer };