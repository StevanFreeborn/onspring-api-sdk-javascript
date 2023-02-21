import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

/**
 * @class GuidListRecordValue - Represents a guid list record value.
 */
export class GuidListRecordValue extends RecordValue<string[]> {
  /**
   * @constructor - Creates a new instance of GuidListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {string[]} value - The value of the field.
   * @returns {GuidListRecordValue} - A new instance of GuidListRecordValue.
   */
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.GuidList, fieldId, value);
  }
}
