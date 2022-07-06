import * as React from 'react';
import { ParagraphVM } from '../..//models/paragraph-vm';
import { TypographyContentData } from '../../models/typography-content-vm';
import { Paragraph } from './paragraph';

const TypographyContent = (props: { data: TypographyContentData }) => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  const content = data.paragraph?.map((element, index) => {
    if (element instanceof ParagraphVM) {
        return <Paragraph key={`feed-paragraph-${index}`} data={element} />
    }
    return <></>
  });

  return <div>{content}</div>;
};

export {
  TypographyContent
};
