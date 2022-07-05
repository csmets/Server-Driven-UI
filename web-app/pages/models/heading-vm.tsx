export enum HeadingType {
  H1,
  H2,
  H3
}

export interface HeadingData {
  type: HeadingType
  value: string
}

export class HeadingVM implements HeadingData {
  type: HeadingType
  value: string


  constructor(heading: any) {
    this.type = this.adaptHeadingType(heading?.type)
    this.value = heading?.value
  }

  adaptHeadingType(type: any): HeadingType {
    switch(type) {
      case "H1":
        return HeadingType.H1;
      case "H2":
        return HeadingType.H2;
      case "H3":
        return HeadingType.H3;
      default:
        return HeadingType.H1;
    }
  }
}
