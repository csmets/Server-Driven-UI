import * as React from 'react';
import {
  Typography as TypographyComponent,
  TypographyVariant as TypographyVariantMUI
} from '@mui/material';
import { TypographyData, TypographyTheme, TypographyVariant } from '../../models/typography-vm';

export const Typography = (props: { data: TypographyData }) => {
  const { data } = props;

  if (!data || !data?.value) {
    return <></>
  }

  return (
    <TypographyComponent
      variant={adaptVariantToMUI(data.variant)}
      display={displayAsBlockOrInline(data.variant)}
      color={adaptThemeColor(data.theme)}
    >
      { data.value }
    </TypographyComponent>
  );
};

const adaptThemeColor = (
  theme: TypographyTheme
): string  => {
  switch (theme) {
    case TypographyTheme.PRIMARY:
      return "text.primary";
    case TypographyTheme.SECONDARY:
      return "text.secondary";
  }
}

const displayAsBlockOrInline = (
  variant: TypographyVariant
): string => {
  switch (variant) {
    case TypographyVariant.CAPTION:
      return "block";
    case TypographyVariant.OVERLINE:
      return "block";
    default:
      return "inline";
  }
};

const adaptVariantToMUI = (
  variant: TypographyVariant
): TypographyVariantMUI => {
  switch (variant) {
    case TypographyVariant.H1:
      return "h1";
    case TypographyVariant.H2:
      return "h2";
    case TypographyVariant.H3:
      return "h3";
    case TypographyVariant.H4:
      return "h4";
    case TypographyVariant.H5:
      return "h5";
    case TypographyVariant.H6:
      return "h6";
    case TypographyVariant.BODY1:
      return "body1";
    case TypographyVariant.BODY2:
      return "body2";
    case TypographyVariant.SUBTITLE1:
      return "subtitle1";
    case TypographyVariant.SUBTITLE2:
      return "subtitle2";
    case TypographyVariant.CAPTION:
      return "caption";
    case TypographyVariant.OVERLINE:
      return "overline";
    default:
      return "body1";
  }
}
