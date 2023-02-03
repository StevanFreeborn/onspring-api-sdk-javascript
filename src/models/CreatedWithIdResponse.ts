export class CreatedWithIdResponse {
  /**
   * @property {number} id - The id of the created object.
   */
  public id: number;

  /**
   * @constructor - Creates a new instance of the CreatedWithIdResponse class.
   * @param id - The id of the created object.
   * @returns {CreatedWithIdResponse} - A new instance of the CreatedWithIdResponse class.
   */
  constructor(id: number) {
    this.id = id;
  }
}
