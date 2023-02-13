import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

/**
 * @class IntegerRecordValue - A record value represented by an integer.
 */
export class IntegerRecordValue extends RecordValue<number> {
  /**
   * @constructor - Creates a new instance of IntegerRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {number} value - The value of the field.
   * @returns {IntgerRecordValue} - A new instance of IntegerRecordValue.
   */
  constructor(fieldId: number, value: number) {
    super(RecordValueType.Integer, fieldId, value);
  }
}
