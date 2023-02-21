import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

/**
 * @class GuidRecordValue - Represents a guid record value.
 */
export class GuidRecordValue extends RecordValue<string> {
  /**
   * @constructor - Creates a new instance of GuidRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {string} value - The value of the field.
   * @returns {GuidRecordValue} - A new instance of GuidRecordValue.
   */
  constructor(fieldId: number, value: string) {
    super(RecordValueType.Guid, fieldId, value);
  }
}
