import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

export class GuidListRecordValue extends RecordValue<string[]> {
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.GuidList, fieldId, value);
  }
}
