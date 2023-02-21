import { RecordValueType } from '../enums/RecordValueType.js';
import { RecordValue } from './RecordValue.js';
import { type TimeSpanData } from './TimeSpanData.js';

export class TimeSpanRecordValue extends RecordValue<TimeSpanData> {
  constructor(fieldId: number, value: TimeSpanData) {
    super(RecordValueType.TimeSpan, fieldId, value);
  }
}
