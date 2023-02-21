import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class StringRecordValue - A record value represented by a string.
 */
export class StringRecordValue extends RecordValue<string> {
  /**
   * @constructor - Creates a new instance of StringRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {string} value - The value of the field.
   * @returns {StringRecordValue} - A new instance of StringRecordValue.
   */
  constructor(fieldId: number, value: string) {
    super(RecordValueType.String, fieldId, value);
  }
}
