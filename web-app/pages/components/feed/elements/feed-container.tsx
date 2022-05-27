import * as React from 'react';
import { FeedItem } from './feed-item';
import { TypographyContent } from '../../typography/typography-content';
import { FeedHeading } from './feed-heading';
import { TypographyContentData, TypographyContentVM } from '../models/typography-content-vm';
import { FeedContainerData } from '../models/feed-container-vm';
import { FeedHeadingVM } from '../models/feed-heading-vm';
import { FeedItemVM } from '../models/feed-item-vm';

const FeedContainer = (props: { data: FeedContainerData }): JSX.Element => {
  const { data } = props;
  const { elements } = data;

  if (!data || !data.elements) {
    return <></>;
  }

  const feedViewList = elements?.map((element, index) => {
    if (element instanceof TypographyContentVM) {
        return <TypographyContent key={`feedTypography-${index}`} data={element} />
    }
    if (element instanceof FeedHeadingVM) {
        return <FeedHeading key={`feedHeading-${index}`} data={element} />
    }
    if (element instanceof FeedItemVM) {
        return <FeedItem key={`feedItem-${index}`} data={element} />
    }
    return <></>
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