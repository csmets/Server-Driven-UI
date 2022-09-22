export interface ImageData {
  url: string;
  alt: string;
}

export class ImageVM implements ImageData {
  url: string;
  alt: string;

  constructor(image: any) {
    this.url = image.url;
    this.alt = image.alt;
  }
}