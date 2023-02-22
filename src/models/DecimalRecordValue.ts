import { RecordValue } from './RecordValue.js';
import { RecordValueType } from '../enums/RecordValueType.js';

/**
 * @class DecimalRecordValue - Represents a decimal record value
 */
export class DecimalRecordValue extends RecordValue<number> {
  /**
   * @constructor - Creates a new instance of DecimalRecordValue
   * @param {number} fieldId - The id of the field
   * @param {number} value - The value of the field
   * @returns {DecimalRecordValue} - A new instance of DecimalRecordValue
   */
  constructor(fieldId: number, value: number) {
    super(RecordValueType.Decimal, fieldId, value);
  }
}
