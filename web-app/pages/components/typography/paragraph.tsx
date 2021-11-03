import * as React from 'react';
import { ParagraphFragment } from '@csmets/typescript-apollo-sdui-types/types';

const Paragraph = (props: { data: ParagraphFragment }) => {
  const { data } = props;

  if (!data || !data?.value) {
    return <></>;
  }

  return <p>{ data.value }</p>
};

export {
  Paragraph
};