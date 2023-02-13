import { RecordValue } from './RecordValue';
import { RecordValueType } from '../enums/RecordValueType';
import { type Delegate } from './Delegate';

export class DelegateListRecordValue extends RecordValue<Delegate[]> {
  constructor(fieldId: number, value: Delegate[]) {
    super(RecordValueType.DelegateList, fieldId, value);
  }
}
