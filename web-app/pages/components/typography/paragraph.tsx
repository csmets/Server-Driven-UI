import * as React from 'react';
import { ParagraphData } from '../feed/models/paragraph-vm';

const Paragraph = (props: { data: ParagraphData }) => {
  const { data } = props;

  if (!data || !data?.value) {
    return <></>;
  }

  return <p>{ data.value }</p>
};

export {
  Paragraph
};
