import { type Readable } from 'stream';
import FormData = require('form-data');

/**
 * @class SaveFileRequest - Represents a request to save a file.
 */
export class SaveFileRequest {
  /**
   * @property {number} recordId - The id of the record that the file will be saved to.
   */
  public recordId: number;

  /**
   * @property {number} fieldId - The id of the field that the file will be saved to.
   */
  public fieldId: number;

  /**
   * @property {string} notes - The notes for the file.
   */
  public notes: string;

  /**
   * @property {Date} modifiedDate - The modified date for the file.
   */
  public modifiedDate: Date;

  /**
   * @property {string} fileName - The name of the file.
   */
  public fileName: string;

  /**
   * @property {string} contentType - The content type of the file.
   */
  public contentType: string;

  /**
   * @property {Readable} fileStream - The file stream.
   */
  public fileStream: Readable;

  /**
   * @constructor - Creates a new SaveFileRequest.
   * @param {number} recordId - The id of the record that the file will be saved to.
   * @param {number} fieldId - The id of the field that the file will be saved to.
   * @param {string} notes - The notes for the file.
   * @param {Date} modifiedDate - The modified date for the file.
   * @param {string} fileName - The name of the file.
   * @param {string} contentType - The content type of the file.
   * @param {Readable} fileStream - The file stream.
   * @returns {SaveFileRequest} - A new SaveFileRequest.
   */
  constructor(
    recordId: number,
    fieldId: number,
    notes: string,
    modifiedDate: Date,
    fileName: string,
    contentType: string,
    fileStream: Readable
  ) {
    this.recordId = recordId;
    this.fieldId = fieldId;
    this.notes = notes;
    this.modifiedDate = modifiedDate;
    this.fileName = fileName;
    this.contentType = contentType;
    this.fileStream = fileStream;
  }

  /**
   * @method AsFormData - Converts the SaveFileRequest to a FormData object.
   * @returns {FormData} - The SaveFileRequest as a FormData object.
   */
  public asFormData(): FormData {
    const formData = new FormData();
    formData.append('recordId', this.recordId.toString());
    formData.append('fieldId', this.fieldId.toString());
    formData.append('notes', this.notes);
    formData.append('modifiedDate', this.modifiedDate.toUTCString());
    formData.append('fileName', this.fileName);
    formData.append('contentType', this.contentType);
    formData.append('file', this.fileStream, this.fileName);
    return formData;
  }
}
