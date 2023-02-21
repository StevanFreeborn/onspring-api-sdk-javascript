import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

export class StringListRecordValue extends RecordValue<string[]> {
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.StringList, fieldId, value);
  }
}
