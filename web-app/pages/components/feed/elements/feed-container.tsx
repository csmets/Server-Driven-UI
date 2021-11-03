import * as React from 'react';
import { FeedContainerFragment } from '@csmets/typescript-apollo-sdui-types/types';
import { FeedItem } from './feed-item';
import { TypographyContent } from '../../typography/typography-content';
import { FeedHeading } from './feed-heading';

const FeedContainer = (props: { data: FeedContainerFragment }): JSX.Element => {
  const { data } = props;
  const { elements } = data;

  if (!data || !data.elements) {
    return <></>;
  }

  const feedViewList = elements?.map((element, index) => {
    switch (element?.__typename) {
      case 'FeedHeading':
        return <FeedHeading key={`feedHeading-${index}`} data={element} />
      case 'FeedItem':
        return <FeedItem key={`feedItem-${index}`} data={element} />
      case 'TypographyContent':
        return <TypographyContent key={`feedTypography-${index}`} data={element} />
      default:
        return <></>
    }
  });

  return (
    <div>
      {feedViewList}
    </div>
  );
}

export {
    FeedContainer
}