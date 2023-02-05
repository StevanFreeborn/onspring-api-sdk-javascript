/**
 * @class ListValue - Represents a list value.
 */
export class ListValue {
  /**
   * @property {string} id - The id of the list value.
   */
  public id: string;

  /**
   * @property {string} name - The name of the list value.
   */
  public name: string;

  /**
   * @property {number} sortOrder - The sort order of the list value.
   */
  public sortOrder: number;

  /**
   * @property {number} numericValue - The numeric value of the list value.
   */
  public numericValue: number;

  /**
   *
   */
  public color: string;

  /**
   * @constructor - Creates a new ListValue.
   * @param {string} id - The id of the list value.
   * @param {string} name - The name of the list value.
   * @param {number} sortOrder - The sort order of the list value.
   * @param {number} numericValue - The numeric value of the list value.
   * @param {string} color - The color of the list value.
   * @returns {ListValue} - A new ListValue.
   */
  constructor(
    id: string,
    name: string,
    sortOrder: number,
    numericValue: number,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.sortOrder = sortOrder;
    this.numericValue = numericValue;
    this.color = color;
  }
}
