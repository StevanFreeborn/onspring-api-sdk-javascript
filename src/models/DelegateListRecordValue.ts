import { RecordValueType } from '../enums/RecordValueType.js';
import { type Delegate } from './Delegate.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class DelegateListRecordValue - Represents a delegate list record value.
 */
export class DelegateListRecordValue extends RecordValue<Delegate[]> {
  /**
   * @constructor - Creates a new instance of DelegateListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {Delegate[]} value - The value of the field.
   * @returns {DelegateListRecordValue} - A new instance of DelegateListRecordValue.
   */
  constructor(fieldId: number, value: Delegate[]) {
    super(RecordValueType.DelegateList, fieldId, value);
  }
}
