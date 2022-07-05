import { FeedHeadingVM, FeedHeadingData } from './feed-heading-vm';
import { FeedItemVM, FeedItemData } from './feed-item-vm';
import { TypographyContentData, TypographyContentVM } from './typography-content-vm';

export type FeedElement = TypographyContentData | FeedHeadingData | FeedItemData

export interface FeedContainerData {
  elements: FeedElement[]
}

export class FeedContainerVM implements FeedContainerData {
  elements: FeedElement[];

  constructor(feed: any) {
    this.elements = []

    feed?.elements?.forEach((el: any) => {
      switch (el.__typename) {
        case "TypographyContent":
          this.elements.push(new TypographyContentVM(el));
          break;
        case "FeedHeading":
          this.elements.push(new FeedHeadingVM(el));
          break;
        case "FeedItem":
          this.elements.push(new FeedItemVM(el));
      }
    })
  }
}