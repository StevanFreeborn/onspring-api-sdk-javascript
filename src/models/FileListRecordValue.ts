import { RecordValueType } from '../enums/RecordValueType.js';
import { type File } from './File.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class FileListRecordValue - Represents a file list record value.
 */
export class FileListRecordValue extends RecordValue<File[]> {
  /**
   * @constructor - Creates a new instance of FileListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {File[]} value - The value of the field.
   * @returns {FileListRecordValue} - A new instance of FileListRecordValue.
   */
  constructor(fieldId: number, value: File[]) {
    super(RecordValueType.FileList, fieldId, value);
  }
}
