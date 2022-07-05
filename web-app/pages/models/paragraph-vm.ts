export interface ParagraphData {
  value?: string
}

export class ParagraphVM implements ParagraphData {
  value?: string;

  constructor(paragraph: any) {
    this.value = paragraph.value
  }
}