import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';

export class IntegerListRecordValue extends RecordValue<number[]> {
  constructor(fieldId: number, value: number[]) {
    super(RecordValueType.IntegerList, fieldId, value);
  }
}
