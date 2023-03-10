import { RecordValueType } from '../enums/RecordValueType.js';
import { type Attachment } from './Attachment.js';
import { RecordValue } from './RecordValue.js';

/**
 * @class AttachmentListRecordValue - A record value represented by a list of attachments.
 */
export class AttachmentListRecordValue extends RecordValue<Attachment[]> {
  /**
   * @constructor - Creates a new instance of AttachmentListRecordValue.
   * @param {number} fieldId - The id of the field.
   * @param {Attachment[]} value - The value of the field.
   * @returns {AttachmentListRecordValue} - A new instance of AttachmentListRecordValue.
   */
  constructor(fieldId: number, value: Attachment[]) {
    super(RecordValueType.AttachmentList, fieldId, value);
  }
}
