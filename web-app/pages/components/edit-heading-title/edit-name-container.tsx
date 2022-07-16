import * as React from 'react';
import { ButtonVM } from '../../models/button-vm';
import { EditNameContainerData, TextInputVM } from '../../models/edit-heading-container-vm';
import { Button } from '../button';
import { TextInput } from './text-input';

const EditNameContainer = (props: { data: EditNameContainerData }) => {

  const { data } = props;

  if (!data || !data.elements) {
    return <></>
  }

  const editNameElements = data.elements.map((element) => {
    if (element instanceof ButtonVM) {
        return <Button data={element}/>;
    }
    if (element instanceof TextInputVM) {
        return <TextInput data={element}/>;
    }
    return <></>;
  })

  return (
    <div>
      {editNameElements}
    </div>
  )
}

export { EditNameContainer };
