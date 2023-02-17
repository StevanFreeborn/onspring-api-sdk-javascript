export class CreatedWithIdResponse<T> {
  /**
   * @property {T} id - The id of the created object.
   */
  public id: T;

  /**
   * @constructor - Creates a new instance of the CreatedWithIdResponse class.
   * @param id - The id of the created object.
   * @returns {CreatedWithIdResponse<T>} - A new instance of the CreatedWithIdResponse class.
   */
  constructor(id: T) {
    this.id = id;
  }
}
