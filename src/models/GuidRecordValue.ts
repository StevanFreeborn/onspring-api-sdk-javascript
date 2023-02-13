import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

export class GuidRecordValue extends RecordValue<string> {
  constructor(fieldId: number, value: string) {
    super(RecordValueType.Guid, fieldId, value);
  }
}
