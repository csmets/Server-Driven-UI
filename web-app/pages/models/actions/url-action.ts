export interface URLActionData {
  url: string
  description?: string
}

export class URLActionVM implements URLActionData {
  url: string;
  description?: string;

  constructor(action: any) {
    this.url = action?.url;
    this.description = action?.description;
  }
}