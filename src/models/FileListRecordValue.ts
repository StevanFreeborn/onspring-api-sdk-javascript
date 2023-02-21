import { RecordValueType } from '../enums/RecordValueType.js';
import { type File } from './File.js';
import { RecordValue } from './RecordValue.js';

export class FileListRecordValue extends RecordValue<File[]> {
  constructor(fieldId: number, value: File[]) {
    super(RecordValueType.FileList, fieldId, value);
  }
}
