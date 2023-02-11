import { DelegateType } from '../enums/DelegateType';
import { FileStorageSite } from '../enums/FileStorageSite';
import { RecordValueType } from '../enums/RecordValueType';
import { TimeSpanIncrement } from '../enums/TimeSpanIncrement';
import { TimeSpanRecurrenceType } from '../enums/TimeSpanRecurrenceType';
import { Attachment } from './Attachment';
import { Delegate } from './Delegate';
import { ScoringGroup } from './ScoringGroup';
import { TimeSpanData } from './TimeSpanData';

/**
 * @class RecordValue - A value for a field in a record.
 */
export class RecordValue {
  /**
   * @property {RecordValueType} type - The type of the record value.
   */
  public type: RecordValueType;

  /**
   * @property {number} fieldId - The id of the field.
   */
  public fieldId: number;

  /**
   * @property {any} value - The value of the field.
   */
  public value: any;

  /**
   * @constructor - Creates a new instance of RecordValue.
   * @param {RecordValueType} type - The type of the record value.
   * @param {number} fieldId - The id of the field.
   * @param {any} value - The value of the field.
   * @returns {RecordValue} - A new instance of RecordValue.
   */
  constructor(type: RecordValueType, fieldId: number, value: any) {
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
    return this.value;
  }

  /**
   * @method asNumber - Gets the value as a number.
   * @returns {number} - The value as a number.
   * @throws {Error} - If the value is not a number.
   */
  public asNumber(): number {
    this.validateType([RecordValueType.Integer, RecordValueType.Decimal]);
    return this.value;
  }

  /**
   * @method asDate - Gets the value as a date.
   * @returns {Date} - The value as a date.
   * @throws {Error} - If the value is not a date.
   */
  public asDate(): Date {
    this.validateType([RecordValueType.Date]);
    return new Date(this.value);
  }

  /**
   * @method asAttachmentArray - Gets the value as an array of attachments.
   * @returns {Attachment[]} - The value as an array of attachments.
   * @throws {Error} - If the value is not an array of attachments.
   * @throws {Error} - If the storage location is not a valid FileStorageSite.
   */
  public asAttachmentArray(): Attachment[] {
    this.validateType([RecordValueType.AttachmentList]);
    return this.value.map((attachment: any) => {
      const storageLocation = FileStorageSite[attachment.storageLocation];

      if (storageLocation === undefined) {
        throw new Error(
          `${
            this.value.storageLocation as string
          } is not a valid FileStorageSite.`
        );
      }

      const hasNotes =
        attachment.notes !== null && attachment.notes !== undefined;

      const notes = hasNotes ? attachment.notes : null;

      return new Attachment(
        attachment.fileId,
        attachment.fileName,
        notes,
        storageLocation
      );
    });
  }

  /**
   * @method asNumberArray - Gets the value as an array of numbers.
   * @returns {number[]} - The value as an array of numbers.
   * @throws {Error} - If the value is not an array of numbers.
   */
  public asNumberArray(): number[] {
    this.validateType([RecordValueType.FileList, RecordValueType.IntegerList]);
    return this.value;
  }

  /**
   * @method asStringArray - Gets the value as an array of strings.
   * @returns {string[]} - The value as an array of strings.
   * @throws {Error} - If the value is not an array of strings.
   */
  public asStringArray(): string[] {
    this.validateType([RecordValueType.StringList, RecordValueType.GuidList]);
    return this.value;
  }

  /**
   * @method asDelegateArray - Gets the value as an array of delegates.
   * @returns {Delegate[]} - The value as an array of delegates.
   * @throws {Error} - If the value is not an array of delegates.
   * @throws {Error} - If a delegate type is not valid.
   */
  public asDelegateArray(): Delegate[] {
    this.validateType([RecordValueType.ScoringGroupList]);
    return this.value.map((delegate: any) => {
      const delegateType = DelegateType[delegate.delegateType];

      if (delegateType === undefined) {
        throw new Error(
          `${delegate.delegateType as string} is not a valid DelegateType.`
        );
      }

      const delegationDateTime = new Date(delegate.delegationDateTime);

      const hasName = delegate.name !== null && delegate.name !== undefined;
      const name = hasName ? delegate.name : null;

      const hasCompletionDate =
        delegate.delegationCompletedDateTime !== null &&
        delegate.delegationCompletedDateTime !== undefined;

      const delegationCompletedDateTime = hasCompletionDate
        ? new Date(delegate.delegationCompletedDateTime)
        : null;

      return new Delegate(
        delegate.delegateType,
        name,
        delegate.emailAddress,
        delegationDateTime,
        delegationCompletedDateTime
      );
    });
  }

  /**
   * @method asScoringGroupArray - Gets the value as an array of scoring groups.
   * @returns {ScoringGroup[]} - The value as an array of scoring groups.
   * @throws {Error} - If the value is not an array of scoring groups.
   */
  public asScoringGroupArray(): ScoringGroup[] {
    this.validateType([RecordValueType.ScoringGroupList]);
    return this.value.map(
      (scoringGroup: any) =>
        new ScoringGroup(
          scoringGroup.listValueId,
          scoringGroup.name,
          scoringGroup.score,
          scoringGroup.maximumScore
        )
    );
  }

  /**
   * @method asTimeSpanData - Gets the value as a TimeSpanData object.
   * @returns {TimeSpanData} - The value as a TimeSpanData object.
   * @throws {Error} - If the value is not a TimeSpanData object.
   * @throws {Error} - If the increment is not valid.
   * @throws {Error} - If the recurrence is not valid.
   */
  public asTimeSpanData(): TimeSpanData {
    this.validateType([RecordValueType.TimeSpan]);

    const increment = TimeSpanIncrement[this.value.increment];

    const hasRecurrence =
      this.value.recurrence !== null && this.value.recurrence !== undefined;

    const recurrene = hasRecurrence
      ? TimeSpanRecurrenceType[this.value.recurrence]
      : null;

    const hasEndAfterOccurrences =
      this.value.endAfterOccurrences !== null &&
      this.value.endAfterOccurrences !== undefined;

    const endAfterOccurrences = hasEndAfterOccurrences
      ? this.value.endAfterOccurrences
      : null;

    const hasEndByDate =
      this.value.endByDate !== null && this.value.endByDate !== undefined;

    const endByDate = hasEndByDate ? new Date(this.value.endByDate) : null;

    if (increment === undefined) {
      throw new Error(
        `${this.value.increment as string} is not a valid TimeSpanIncrement.`
      );
    }

    if (recurrene === undefined) {
      throw new Error(
        `${
          this.value.recurrence as string
        } is not a valid TimeSpanRecurrenceType.`
      );
    }

    return new TimeSpanData(
      this.value.quantity,
      increment,
      recurrene,
      endAfterOccurrences,
      endByDate
    );
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
