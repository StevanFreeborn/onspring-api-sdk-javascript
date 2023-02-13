import { RecordValueType } from '../enums/RecordValueType';
import { RecordValue } from './RecordValue';
import { type TimeSpanData } from './TimeSpanData';

export class TimeSpanRecordValue extends RecordValue<TimeSpanData> {
  constructor(fieldId: number, value: TimeSpanData) {
    super(RecordValueType.TimeSpan, fieldId, value);
  }
}
