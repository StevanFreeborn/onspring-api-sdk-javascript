import { RecordValue } from './RecordValue';
import { RecordValueType } from '../enums/RecordValueType';
import { type File } from './File';

export class FileListRecordValue extends RecordValue<File[]> {
  constructor(fieldId: number, value: File[]) {
    super(RecordValueType.FileList, fieldId, value);
  }
}
