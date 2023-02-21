import { type TimeSpanIncrement } from '../enums/TimeSpanIncrement.js';
import { type TimeSpanRecurrenceType } from '../enums/TimeSpanRecurrenceType.js';

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
  public recurrence: TimeSpanRecurrenceType | null;

  /**
   * @property {number} endAfterOccurrences - The number of occurrences of the time span.
   */
  public endAfterOccurrences: number | null;

  public endByDate: Date | null;

  /**
   * @constructor - Creates a new instance of TimeSpanData.
   * @param {number} quantity - The quantity of the time span.
   * @param {TimeSpanIncrement} increment - The increment of the time span.
   * @param {TimeSpanRecurrenceType | null} recurrence - The recurrence of the time span.
   * @param {number | null} endAfterOccurrences - The number of occurrences of the time span.
   * @param {Date | null} endByDate - The end date of the time span.
   * @returns {TimeSpanData} - A new instance of TimeSpanData.
   */
  constructor(
    quantity: number,
    increment: TimeSpanIncrement,
    recurrence: TimeSpanRecurrenceType | null,
    endAfterOccurrences: number | null,
    endByDate: Date | null
  ) {
    this.quantity = quantity;
    this.increment = increment;
    this.recurrence = recurrence;
    this.endAfterOccurrences = endAfterOccurrences;
    this.endByDate = endByDate;
  }
}
