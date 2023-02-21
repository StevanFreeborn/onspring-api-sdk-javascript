import { RecordValue } from './RecordValue.js';
import { RecordValueType } from '../enums/RecordValueType.js';

export class DecimalRecordValue extends RecordValue<number> {
  constructor(fieldId: number, value: number) {
    super(RecordValueType.Decimal, fieldId, value);
  }
}
