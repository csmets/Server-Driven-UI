import { EmitSignalData, SignalData, SignalVM, EmitSignalVM } from './signal-vm';

export type FeedElement = FeedImageData | FeedCaptionData | FeedColumnLayoutData

export interface FeedImageData {
  src: string
  alt: string
}

export class FeedImageVM implements FeedImageData {
  src: string;
  alt: string;

  constructor(image: any) {
    this.src = image.src;
    this.alt = image.alt;
  }
}

export interface FeedCaptionData {
  text: string
}

export class FeedCaptionVM implements FeedCaptionData {
  text: string;

  constructor(caption: any) {
    this.text = caption.text;
  }
}

export type FeedColumnElement = FeedFavouriteCountData | FeedFavouriteData

export enum ColumnAlignment {
  Center = 'CENTER',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export interface FeedFavouriteCountData {
  align: ColumnAlignment
  id: string
  count: string
  signal?: SignalData
}

export class FeedFavouriteCountVM implements FeedFavouriteCountData {
  align: ColumnAlignment;
  id: string;
  count: string;
  signal?: SignalData;

  constructor(favouriteCount: any) {
    this.align = favouriteCount.align;
    this.id = favouriteCount.id;
    this.count = favouriteCount.count;
    if (favouriteCount.signal) {
      this.signal = new SignalVM(favouriteCount.signal);
    }
  }
}

export interface FeedFavouriteData {
  align: ColumnAlignment
  id: string
  icon: string
  signal?: SignalData
  action?: FavouriteActionData
}

export class FeedFavouriteVM implements FeedFavouriteData {
  align: ColumnAlignment
  id: string
  icon: string
  signal?: SignalData
  action?: FavouriteActionData

  constructor(feedFavourite: any) {
    this.align = feedFavourite.align;
    this.id = feedFavourite.id;
    this.icon = feedFavourite.icon;
    if (feedFavourite.signal) {
      this.signal = new SignalVM(feedFavourite.signal);
    }
    if (feedFavourite.action) {
      this.action = new FavouriteActionVM(feedFavourite.action);
    }
  }
}

export interface FavouriteActionData {
  feedId: string
  save?: EmitSignalData[]
  unsave?: EmitSignalData[]
}

export class FavouriteActionVM implements FavouriteActionData {
  feedId: string;
  save?: EmitSignalData[];
  unsave?: EmitSignalData[];

  constructor(action: any) {
    this.feedId = action.feedId;
    if (action.save?.length) {
      this.save = [];
      action.save.forEach((a: any) => {
        this.save?.push(new EmitSignalVM(a));
      })
    }

    if (action.unsave?.length) {
      this.unsave = [];
      action.unsave.forEach((ua: any) => {
        this.unsave?.push(new EmitSignalVM(ua));
      })
      this.unsave?.push;
    }
  }
}

export interface FeedColumnLayoutData {
  columns: FeedColumnElement[]
}

export class FeedColumnLayoutVM implements FeedColumnLayoutData {
  columns: FeedColumnElement[]

  constructor(columnLayout: any) {
    this.columns = []
    columnLayout.columns.forEach((column: any) => {
      switch (column.__typename) {
        case 'FeedFavourite':
          this.columns.push(new FeedFavouriteVM(column))
          break;
        case 'FeedFavouriteCount':
          this.columns.push(new FeedFavouriteCountVM(column))
      }
    });
  }
}

export interface FeedItemData {
  items: FeedElement[]
}

export class FeedItemVM implements FeedItemData {
  items: FeedElement[]

  constructor(feedItem: any) {
    this.items = [];
    if (feedItem.items?.length) {
      feedItem.items.forEach((item: any) => {
        switch (item.__typename) {
          case 'FeedImage':
            this.items.push(new FeedImageVM(item))
            break;
          case 'ColumnLayout':
            this.items.push(new FeedColumnLayoutVM(item))
            break;
          case 'FeedCaption':
            this.items.push(new FeedCaptionVM(item))
            break;
        }
      });
    }
  }
}