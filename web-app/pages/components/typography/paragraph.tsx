import * as React from 'react';
import { ParagraphFragment } from '@csmets/generated-types/generated/types';

const Paragraph = (props: { data: ParagraphFragment }) => {
  const { data } = props;

  if (!data || !data?.text) {
    return <></>;
  }

  return <p>{ data.text }</p>
};

export {
  Paragraph
};