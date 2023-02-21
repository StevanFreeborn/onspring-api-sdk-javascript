/**
 * @enum FormulaOutputType - The type of the formula output.
 */
export enum FormulaOutputType {
  /**
   * @constant Text - The formula output is a text value.
   * @type {string}
   */
  Text = 'Text',

  /**
   * @constant Numeric - The formula output is a numeric value.
   * @type {string}
   */
  Numeric = 'Numeric',

  /**
   * @constant DateAndTime - The formula output is a date and time value.
   * @type {string}
   */
  DateAndTime = 'DateAndTime',

  /**
   * @constant ListValue - The formula output is a list value.
   * @type {string}
   */
  ListValue = 'ListValue',
}
