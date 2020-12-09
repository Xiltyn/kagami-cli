import { trim } from '../decorators'

export class ImageFile {
  @trim()
  filePath: string

  @trim()
  base64?: null | string = null

  @trim()
  mime?: null | string = null

  constructor(data: ImageFile.IImageFile) {
    this.filePath = data.filePath
  }
}

export namespace ImageFile {
  export interface IImageFile {
    filePath: string
  }

  export enum FileTypes {
    PNG = 'png',
    GIF = 'gif',
    JPG = 'jpg',
    JPEG = 'jpeg'
  }
}
