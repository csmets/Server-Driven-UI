export interface ImageData {
  url: string;
  alt: string;
}

export class ImageVM implements ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;

  constructor(image: any) {
    this.url = image.url;
    this.alt = image.alt;
    this.width = image.width;
    this.height = image.height
  }
}