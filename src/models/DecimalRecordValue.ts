import { RecordValue } from './RecordValue';
import { RecordValueType } from '../enums/RecordValueType';

export class DecimalRecordValue extends RecordValue<number> {
  constructor(fieldId: number, value: number) {
    super(RecordValueType.Decimal, fieldId, value);
  }
}
