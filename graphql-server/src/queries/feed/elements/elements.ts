import {heading} from './heading';
import {typography} from './typography';
import {fetchFeed} from '../../../components/feed/feed';
import { Card } from '../../../types';

export type FeedElement = typeof heading | typeof typography | Card[];

export interface FeedElements {
  [key: string]: FeedElement;
}

export const elements: FeedElements = {
  heading: heading,
  typography: typography,
  feed: [...fetchFeed()],
};
