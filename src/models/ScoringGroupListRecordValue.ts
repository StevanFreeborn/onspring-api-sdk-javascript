import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';
import { type ScoringGroup } from './ScoringGroup';

export class ScoringGroupListRecordValue extends RecordValue<ScoringGroup[]> {
  constructor(fieldId: number, value: ScoringGroup[]) {
    super(RecordValueType.ScoringGroupList, fieldId, value);
  }
}
