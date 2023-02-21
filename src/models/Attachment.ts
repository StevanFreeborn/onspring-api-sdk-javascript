import { type FileStorageSite } from '../enums/FileStorageSite.js';

/**
 * @class Attachment - Represents an attachment.
 */
export class Attachment {
  /**
   * @property {number} fileId - The id of the file.
   */
  public fileId: number;

  /**
   * @property {string} fileName - The name of the file.
   */
  public fileName: string;

  /**
   * @property {string | null} notes - The notes associated with the file.
   */
  public notes: string | null;

  /**
   * @property {FileStorageSite} storageLocation - The storage location of the file.
   */
  public storageLocation: FileStorageSite;

  /**
   * @constructor - Creates a new instance of Attachment.
   * @param {number} fileId - The id of the file.
   * @param {string} fileName - The name of the file.
   * @param {string | null} notes - The notes associated with the file.
   * @param {FileStorageSite} storageLocation - The storage location of the file.
   * @returns {Attachment} - A new instance of Attachment.
   */
  constructor(
    fileId: number,
    fileName: string,
    notes: string | null,
    storageLocation: FileStorageSite
  ) {
    this.fileId = fileId;
    this.fileName = fileName;
    this.notes = notes;
    this.storageLocation = storageLocation;
  }
}
