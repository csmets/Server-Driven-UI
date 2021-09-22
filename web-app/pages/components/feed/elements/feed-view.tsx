import * as React from 'react';
import { FeedViewFragment } from '@csmets/generated-types/generated/types';
import { FeedItem } from './feed-item';
import { TypographyContent } from '../../typography/typography-content';

const FeedView = (props: { data: FeedViewFragment }): JSX.Element => {
  const { data } = props;

  if (!data || !data.elements) {
    return <></>;
  }

  const feedViewList = data.elements.map((element, index) => {
    switch (element?.__typename) {
      case 'FeedItem':
        return <FeedItem key={`feedItem-${index}`} data={element} />
      case 'TypographyContent':
        return <TypographyContent key={`feedTypograph-${index}`} data={element} />
      default:
        return <></>
    }
  });

  return (
    <>{feedViewList}</>
  );
}

export {
    FeedView
}