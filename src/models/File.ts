import { type Readable } from 'stream';

/**
 * @class File - Represents a file retrieved from Onspring.
 */
export class File {
  /**
   * @property {Readable} stream - The stream of the file.
   */
  public stream: Readable;

  /**
   * @property {string} fileName - The name of the file.
   */
  public fileName: string;

  /**
   * @property {string} contentType - The content type of the file.
   */
  public contentType: string;

  /**
   * @property {number} contentLength - The content length of the file.
   */
  public contentLength: number;

  /**
   * @constructor - Creates a new instance of File.
   * @param {Readable} stream - The stream of the file.
   * @param {string} fileName - The name of the file.
   * @param {string} contentType - The content type of the file.
   * @param {number} contentLength - The content length of the file.
   * @returns {File} - A new instance of File.
   */
  constructor(
    stream: Readable,
    fileName: string,
    contentType: string,
    contentLength: number
  ) {
    this.stream = stream;
    this.fileName = fileName;
    this.contentType = contentType;
    this.contentLength = contentLength;
  }
}
