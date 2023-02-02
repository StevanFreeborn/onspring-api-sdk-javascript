/**
 * @class CollectionResponse - A generic object for responses that contain collections of objects.
 */
export class CollectionResponse<T> {
  /**
   * @property {number} count - The total count of items in the collection.
   */
  public count: number;

  /**
   * @property {T} items - The items in the collection.
   */
  public items: T;

  /**
   * @constructor - Creates a new instance of the CollectionResponse class.
   * @param {number} count - The total count of items in the collection.
   * @param {T} items - The items in the collection.
   * @returns {CollectionResponse<T>} - A new instance of the CollectionResponse.
   */
  constructor(count: number, items: T) {
    this.count = count;
    this.items = items;
  }
}
