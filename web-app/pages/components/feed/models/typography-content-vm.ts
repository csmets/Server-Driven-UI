import { ParagraphData } from "./paragraph-vm";

export interface TypographyContentData {
  paragraph: ParagraphData[]
}

export class TypographyContentVM implements TypographyContentData {
  paragraph: ParagraphData[];

  constructor(typography: any) {
    this.paragraph = typography.paragraph
  }
}