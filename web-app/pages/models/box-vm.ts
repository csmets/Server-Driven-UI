export interface BoxData {
  _debugColor?: string;
  width?: number
  height?: number
}

export class BoxVM implements BoxData {
  _debugColor?: string;
  width?: number;
  height?: number;

  constructor(box: any) {
    this._debugColor = this.adaptDebugColor(box?._debugColor);
    this.width = box?.width;
    this.height = box?.height;
  }

  private adaptDebugColor(color?: string): string | undefined {
    switch (color) {
      case "PRIMARY":
        return 'primary.light';
      case "SECONDARY":
        return 'secondary.light';
      case "ERROR":
        return 'error.light';
      case "WARNING":
        return 'warning.light';
      case "INFO":
        return 'info.light';
      case "SUCCESS":
        return 'success.light';
      default:
        return undefined;
    }
  }
}
