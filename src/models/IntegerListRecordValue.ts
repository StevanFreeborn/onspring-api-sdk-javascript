import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

/**
 * @class IntegerListRecordValue - Represents an integer list record value.
 */
export class IntegerListRecordValue extends RecordValue<number[]> {
  /**
   * @constructor - Creates a new instance of IntegerListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {number[]} value - The value of the field.
   * @returns {IntegerListRecordValue} - A new instance of IntegerListRecordValue.
   */
  constructor(fieldId: number, value: number[]) {
    super(RecordValueType.IntegerList, fieldId, value);
  }
}
