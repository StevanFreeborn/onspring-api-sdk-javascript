import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

export class GuidListRecordValue extends RecordValue<string[]> {
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.GuidList, fieldId, value);
  }
}
