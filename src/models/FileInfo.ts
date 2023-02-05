import { FieldType } from '../enums/FieldType';

/**
 * @class FileInfo - Represents a file info.
 */
export class FileInfo {
  /**
   * @property {FieldType} type - The type of the file.
   */
  public type: FieldType;

  /**
   * @property {string} contentType - The content type of the file.
   */
  public contentType: string;

  /**
   * @property {string} name - The name of the file.
   */
  public name: string;

  /**
   * @property {Date} createdDate - The created date of the file.
   */
  public createdDate: Date;

  /**
   * @property {Date} modifiedDate - The modified date of the file.
   */
  public modifiedDate: Date;

  /**
   * @property {string} owner - The owner of the file.
   */
  public owner: string;

  /**
   * @property {string} notes - The notes of the file.
   */
  public notes: string;

  /**
   * @property {string} fileHref - The href of the file.
   */
  public fileHref: string;

  constructor(
    type: string,
    contentType: string,
    name: string,
    createdDate: Date,
    modifiedDate: Date,
    owner: string,
    notes: string,
    fileHref: string
  ) {
    if (FieldType[type] === undefined) {
      throw new Error(`The type '${type}' is not a valid FieldType.`);
    }

    this.type = FieldType[type];
    this.contentType = contentType;
    this.name = name;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.owner = owner;
    this.notes = notes;
    this.fileHref = fileHref;
  }
}
