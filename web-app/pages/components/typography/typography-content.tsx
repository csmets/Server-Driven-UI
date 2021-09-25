import * as React from 'react';
import { TypographyContentFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { Paragraph } from './paragraph';

const TypographyContent = (props: { data: TypographyContentFragment }) => {
  const { data } = props;

  if (!data) {
    return <></>;
  }

  const content = data.paragraph?.map((element, index) => {
    switch (element?.__typename) {
      case 'Paragraph':
        return <Paragraph key={`feed-paragraph-${index}`} data={element} />
      default:
        return <></>
    }
  });

  return <div>{content}</div>;
};

export {
  TypographyContent
};