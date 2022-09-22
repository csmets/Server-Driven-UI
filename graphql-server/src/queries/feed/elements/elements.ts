import { heading } from './heading';
import { typography } from './typography';
import { fetchFeed } from '../../../components/feed/feed';

export const elements = {
  "heading": heading,
  "typography": typography,
  "feed": [ ...fetchFeed() ]
}