/**
 * @class ListItemRequest - Represents a list item request
 */
export class ListItemRequest {
  /**
   * @property {number} listId - The id for the list that the item belongs to.
   */
  public listId: number;

  /**
   * @property {string | null} id - The id for the list item.
   */
  public id: string | null;

  /**
   * @property {string} name - The name of the list item.
   */
  public name: string;

  /**
   * @property {number | null} numericValue - The numeric value of the list item.
   */
  public numericValue: number | null;

  /**
   * @property {string | null} color - The color of the list item.
   */
  public color: string | null;

  /**
   * @constructor - Creates a new instance of the ListItemRequest class.
   * @param {number} listId - The id for the list that the item belongs to.
   * @param {string | null} id - The id for the list item.
   * @param {string} name - The name of the list item.
   * @param {number | null} numericValue - The numeric value of the list item.
   * @param {string | null} color - The color of the list item.
   * @returns {ListItemRequest} - A new instance of the ListItemRequest class.
   */
  constructor(
    listId: number,
    id: string | null,
    name: string,
    numericValue: number | null,
    color: string | null
  ) {
    this.listId = listId;
    this.id = id;
    this.name = name;
    this.numericValue = numericValue;
    this.color = color;
  }
}
