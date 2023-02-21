import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';
import { type ScoringGroup } from './ScoringGroup.js';

export class ScoringGroupListRecordValue extends RecordValue<ScoringGroup[]> {
  constructor(fieldId: number, value: ScoringGroup[]) {
    super(RecordValueType.ScoringGroupList, fieldId, value);
  }
}
