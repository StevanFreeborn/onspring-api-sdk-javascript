import { type TimeSpanIncrement } from '../enums/TimeSpanIncrement';
import { type TimeSpanRecurrenceType } from '../enums/TimeSpanRecurrenceType';

export class TimeSpanData {
  /**
   * @property {number} quantity - The quantity of the time span.
   */
  public quantity: number;

  /**
   * @property {TimeSpanIncrement} increment - The increment of the time span.
   */
  public increment: TimeSpanIncrement;

  /**
   * @property {TimeSpanRecurrence} recurrence - The recurrence of the time span.
   */
  public recurrence: TimeSpanRecurrenceType;

  /**
   * @property {number} endAfterOccurrences - The number of occurrences of the time span.
   */
  public endAfterOccurrences: number;

  public endByDate: Date;

  /**
   * @constructor - Creates a new instance of TimeSpanData.
   * @param {number} quantity - The quantity of the time span.
   * @param {TimeSpanIncrement} increment - The increment of the time span.
   * @param {TimeSpanRecurrenceType} recurrence - The recurrence of the time span.
   * @param {number} endAfterOccurrences - The number of occurrences of the time span.
   * @param {Date} endByDate - The end date of the time span.
   * @returns {TimeSpanData} - A new instance of TimeSpanData.
   */
  constructor(
    quantity: number,
    increment: TimeSpanIncrement,
    recurrence: TimeSpanRecurrenceType,
    endAfterOccurrences: number,
    endByDate: Date
  ) {
    this.quantity = quantity;
    this.increment = increment;
    this.recurrence = recurrence;
    this.endAfterOccurrences = endAfterOccurrences;
    this.endByDate = endByDate;
  }
}
