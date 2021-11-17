import { useQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { EditNameDocument, EditNameQuery } from '../../../../generated-types/react/types';
import { EditNameContainer } from './edit-name-container';

const EditHeadingTitle = () => {
  const { data, loading, error } = useQuery<EditNameQuery>(EditNameDocument);

  if (loading) {
    console.log('loading editName query');
  }

  if (error) {
    console.log('something went wrong with editName query');
  }

  if (!data || !data.editName) {
    return <></>;
  }

  return (
    <div>
      <EditNameContainer data={data.editName} />
    </div>
  )
};

export {
  EditHeadingTitle
}