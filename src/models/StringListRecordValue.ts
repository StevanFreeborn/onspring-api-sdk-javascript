import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

export class StringListRecordValue extends RecordValue<string[]> {
  constructor(fieldId: number, value: string[]) {
    super(RecordValueType.StringList, fieldId, value);
  }
}
