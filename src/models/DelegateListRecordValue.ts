import { RecordValueType } from '../enums/RecordValueType.js';
import { type Delegate } from './Delegate.js';
import { RecordValue } from './RecordValue.js';

export class DelegateListRecordValue extends RecordValue<Delegate[]> {
  constructor(fieldId: number, value: Delegate[]) {
    super(RecordValueType.DelegateList, fieldId, value);
  }
}
