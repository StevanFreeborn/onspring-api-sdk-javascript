/**
 * @class ListItemRequest - Represents a list item request
 */
export class ListItemRequest {
  /**
   * @property {number} listId - The id for the list that the item belongs to.
   */
  public listId: number;

  /**
   * @property {string} id - The id for the list item.
   */
  public id: string;

  /**
   * @property {string} name - The name of the list item.
   */
  public name: string;

  /**
   * @property {number} numericValue - The numeric value of the list item.
   */
  public numericValue: number;

  /**
   * @property {string} color - The color of the list item.
   */
  public color: string;

  /**
   * @constructor - Creates a new instance of the ListItemRequest class.
   * @param {number} listId - The id for the list that the item belongs to.
   * @param {string} id - The id for the list item.
   * @param {string} name - The name of the list item.
   * @param {number} numericValue - The numeric value of the list item.
   * @param {string} color - The color of the list item.
   * @returns {ListItemRequest} - A new instance of the ListItemRequest class.
   */
  constructor(
    listId: number,
    id: string,
    name: string,
    numericValue: number,
    color: string
  ) {
    this.listId = listId;
    this.id = id;
    this.name = name;
    this.numericValue = numericValue;
    this.color = color;
  }
}
