import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class StringListRecordValue - Represents a string list record value.
 */
export class StringListRecordValue extends RecordValue<string[]> {
  /**
   * @constructor - Creates a new instance of StringListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {string[]} value - The value of the field.
   * @returns {StringListRecordValue} - A new instance of StringListRecordValue.
   */
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.StringList, fieldId, value);
  }
}
