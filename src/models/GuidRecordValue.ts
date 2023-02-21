import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

export class GuidRecordValue extends RecordValue<string> {
  constructor(fieldId: number, value: string) {
    super(RecordValueType.Guid, fieldId, value);
  }
}
