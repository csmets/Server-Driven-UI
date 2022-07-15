export enum TypographyVariant {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  BODY1,
  BODY2,
  SUBTITLE1,
  SUBTITLE2,
  CAPTION,
  OVERLINE
}

export enum TypographyTheme {
  PRIMARY,
  SECONDARY
}

export interface TypographyData {
  variant: TypographyVariant
  value: string
  theme: TypographyTheme
}

export class TypographyVM implements TypographyData {
  variant: TypographyVariant
  value: string
  theme: TypographyTheme

  constructor(typography: any) {
    this.value = typography?.value;
    this.variant = this.adaptVariant(typography?.variant);
    this.theme = this.adaptTheme(typography?.theme);
  }

  adaptVariant(type: any): TypographyVariant {
    switch(type) {
      case "H1":
        return TypographyVariant.H1;
      case "H2":
        return TypographyVariant.H2;
      case "H3":
        return TypographyVariant.H3;
      case "H4":
        return TypographyVariant.H4;
      case "H5":
        return TypographyVariant.H5;
      case "H6":
        return TypographyVariant.H6;
      case "BODY1":
        return TypographyVariant.BODY1;
      case "BODY2":
        return TypographyVariant.BODY2;
      case "SUBTITLE1":
        return TypographyVariant.SUBTITLE1;
      case "SUBTITLE2":
        return TypographyVariant.SUBTITLE2;
      case "CAPTION":
        return TypographyVariant.CAPTION;
      case "OVERLINE":
        return TypographyVariant.OVERLINE;
      default:
        return TypographyVariant.BODY1;
    }
  }

  adaptTheme(th: any): TypographyTheme {
    switch(th) {
      case "PRIMARY":
        return TypographyTheme.PRIMARY;
      case "SECONDARY":
        return TypographyTheme.SECONDARY;
      default:
        return TypographyTheme.PRIMARY;
    }
  }
}
