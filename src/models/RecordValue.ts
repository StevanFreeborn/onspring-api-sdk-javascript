import { RecordValueType } from '../enums/RecordValueType.js';
import { type Attachment } from './Attachment.js';
import { type AttachmentListRecordValue } from './AttachmentListRecordValue.js';
import { type Delegate } from './Delegate.js';
import { type DelegateListRecordValue } from './DelegateListRecordValue.js';
import { type ScoringGroup } from './ScoringGroup.js';
import { type ScoringGroupListRecordValue } from './ScoringGroupListRecordValue.js';
import { type TimeSpanData } from './TimeSpanData.js';
import { type TimeSpanRecordValue } from './TimeSpanRecordValue.js';

/**
 * @class RecordValue - A value for a field in a record.
 */
export class RecordValue<T> {
  /**
   * @property {RecordValueType} type - The type of the record value.
   */
  public type: RecordValueType;

  /**
   * @property {number} fieldId - The id of the field.
   */
  public fieldId: number;

  /**
   * @property {T} value - The value of the field.
   */
  public value: T;

  /**
   * @constructor - Creates a new instance of RecordValue.
   * @param {RecordValueType} type - The type of the record value.
   * @param {number} fieldId - The id of the field.
   * @param {any} value - The value of the field.
   * @returns {RecordValue} - A new instance of RecordValue.
   */
  constructor(type: RecordValueType, fieldId: number, value: T) {
    this.type = type;
    this.fieldId = fieldId;
    this.value = value;
  }

  /**
   * @method asString - Gets the value as a string.
   * @returns {string} - The value as a string.
   * @throws {Error} - If the value is not a string.
   */
  public asString(): string {
    this.validateType([RecordValueType.String, RecordValueType.Guid]);
    return this.value as string;
  }

  /**
   * @method asNumber - Gets the value as a number.
   * @returns {number} - The value as a number.
   * @throws {Error} - If the value is not a number.
   */
  public asNumber(): number {
    this.validateType([RecordValueType.Integer, RecordValueType.Decimal]);
    return this.value as number;
  }

  /**
   * @method asDate - Gets the value as a date.
   * @returns {Date} - The value as a date.
   * @throws {Error} - If the value is not a date.
   */
  public asDate(): Date {
    this.validateType([RecordValueType.Date]);
    return this.value as Date;
  }

  /**
   * @method asAttachmentArray - Gets the value as an array of attachments.
   * @returns {Attachment[]} - The value as an array of attachments.
   * @throws {Error} - If the value is not an array of attachments.
   * @throws {Error} - If the storage location is not a valid FileStorageSite.
   */
  public asAttachmentArray(): Attachment[] {
    this.validateType([RecordValueType.AttachmentList]);
    return (this as AttachmentListRecordValue).value;
  }

  /**
   * @method asNumberArray - Gets the value as an array of numbers.
   * @returns {number[]} - The value as an array of numbers.
   * @throws {Error} - If the value is not an array of numbers.
   */
  public asNumberArray(): number[] {
    this.validateType([RecordValueType.FileList, RecordValueType.IntegerList]);
    return this.value as number[];
  }

  /**
   * @method asStringArray - Gets the value as an array of strings.
   * @returns {string[]} - The value as an array of strings.
   * @throws {Error} - If the value is not an array of strings.
   */
  public asStringArray(): string[] {
    this.validateType([RecordValueType.StringList, RecordValueType.GuidList]);
    return this.value as string[];
  }

  /**
   * @method asDelegateArray - Gets the value as an array of delegates.
   * @returns {Delegate[]} - The value as an array of delegates.
   * @throws {Error} - If the value is not an array of delegates.
   */
  public asDelegateArray(): Delegate[] {
    this.validateType([RecordValueType.DelegateList]);
    return (this as DelegateListRecordValue).value;
  }

  /**
   * @method asScoringGroupArray - Gets the value as an array of scoring groups.
   * @returns {ScoringGroup[]} - The value as an array of scoring groups.
   * @throws {Error} - If the value is not an array of scoring groups.
   */
  public asScoringGroupArray(): ScoringGroup[] {
    this.validateType([RecordValueType.ScoringGroupList]);
    return (this as ScoringGroupListRecordValue).value;
  }

  /**
   * @method asTimeSpanData - Gets the value as a TimeSpanData object.
   * @returns {TimeSpanData} - The value as a TimeSpanData object.
   * @throws {Error} - If the value is not a TimeSpanData object.
   */
  public asTimeSpanData(): TimeSpanData {
    this.validateType([RecordValueType.TimeSpan]);
    return (this as TimeSpanRecordValue).value;
  }

  /**
   * @method validateType - Validates the type of the field value.
   * @param {RecordValueType[]} expectedTypes - The expected types.
   * @throws {Error} - If the type is not valid.
   */
  private validateType(expectedTypes: RecordValueType[]): void {
    if (expectedTypes.includes(this.type) === false) {
      throw new Error(
        `Unable to get value for field value. Field value type must be of the following types: ${expectedTypes.join(
          ', '
        )}. Actual type: ${this.type}`
      );
    }
  }
}
