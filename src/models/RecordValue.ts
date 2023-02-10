import { type RecordValueType } from '../enums/RecordValueType';

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
   * @param {T} value - The value of the field.
   * @returns {RecordValue} - A new instance of RecordValue.
   */
  constructor(type: RecordValueType, fieldId: number, value: T) {
    this.type = type;
    this.fieldId = fieldId;
    this.value = value;
  }
}
