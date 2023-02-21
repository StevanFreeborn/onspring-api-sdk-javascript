import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class DateRecordValue - A value for a date field in a record.
 */
export class DateRecordValue extends RecordValue<Date> {
  /**
   * @constructor - Creates a new instance of DateRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {Date} value - The value of the field.
   * @returns {DateRecordValue} - A new instance of DateRecordValue.
   */
  constructor(fieldId: number, value: Date) {
    super(RecordValueType.Date, fieldId, value);
  }
}
