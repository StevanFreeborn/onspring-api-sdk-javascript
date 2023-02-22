import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';
import { type ScoringGroup } from './ScoringGroup.js';

/**
 * @class ScoringGroupListRecordValue - Represents a scoring group list record value.
 */
export class ScoringGroupListRecordValue extends RecordValue<ScoringGroup[]> {
  /**
   * @constructor - Creates a new instance of ScoringGroupListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {ScoringGroup[]} value - The value of the field.
   * @returns {ScoringGroupListRecordValue} - A new instance of ScoringGroupListRecordValue.
   */
  constructor(fieldId: number, value: ScoringGroup[]) {
    super(RecordValueType.ScoringGroupList, fieldId, value);
  }
}
