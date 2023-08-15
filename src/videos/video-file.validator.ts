import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class VideoFileValidator extends FileValidator {
  isValid(file?: IFile): boolean | Promise<boolean> {
    return (
      file.mimetype === this.validationOptions.mimeType &&
      file.size < this.validationOptions.maxSize
    );
  }

  buildErrorMessage(file: any): string {
    if (!file) return 'File is required';

    if (file.mimetype === this.validationOptions.mimeType) {
      return `File must be ${this.validationOptions.mimeType}`;
    }

    if (file.size > this.validationOptions.maxSize) {
      return `File must be less than ${this.validationOptions.maxSize}`;
    }
  }
}
