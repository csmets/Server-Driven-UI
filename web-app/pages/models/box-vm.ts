export interface BoxData {
  width?: number
  height?: number
}

export class BoxVM implements BoxData {
  width?: number;
  height?: number;

  constructor(box: any) {
    this.width = box?.width;
    this.height = box?.height;
  }
}
