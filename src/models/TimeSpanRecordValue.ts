import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';
import { type TimeSpanData } from './TimeSpanData.js';

/**
 * @class TimeSpanRecordValue - Represents a time span record value.
 */
export class TimeSpanRecordValue extends RecordValue<TimeSpanData> {
  /**
   * @constructor - Creates a new instance of TimeSpanRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {TimeSpanData} value - The value of the field.
   * @returns {TimeSpanRecordValue} - A new instance of TimeSpanRecordValue.
   */
  constructor(fieldId: number, value: TimeSpanData) {
    super(RecordValueType.TimeSpan, fieldId, value);
  }
}
