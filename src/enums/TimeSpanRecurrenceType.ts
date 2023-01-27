/**
 * @enum TimeSpanRecurrenceType - The type of recurrence for a time span.
 * @type {string}
 */
export enum TimeSpanRecurrenceType {
  /**
   * @constant None - The time span does not recur.
   * @type {string}
   */
  None = 'None',

  /**
   * @constant EndByDate - The time span recurs until a specific date.
   * @type {string}
   */
  EndByDate = 'EndByDate',

  /**
   * @constant EndAfterOccurrences - The time span recurs for a specific number of occurrences.
   * @type {string}
   */
  EndAfterOccurrences = 'EndAfterOccurrences',
}
