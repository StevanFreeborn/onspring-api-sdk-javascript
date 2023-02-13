import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';

export class IntegerListRecordValue extends RecordValue<number[]> {
  constructor(fieldId: number, value: number[]) {
    super(RecordValueType.IntegerList, fieldId, value);
  }
}
