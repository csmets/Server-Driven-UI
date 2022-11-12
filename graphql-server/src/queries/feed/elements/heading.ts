import { signalEnum } from '../../../components/signal';
import { TypographyTheme, TypographyVariant } from '../../../types';

export const heading = {
  signal: {
    type: signalEnum.TITLE,
    reference: null
  },
  value: 'Example list of feed items',
  typographyVariant: TypographyVariant.H1,
  typographyTheme: TypographyTheme.Primary
};