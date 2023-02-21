import { CreatedWithIdResponse } from './CreatedWithIdResponse.js';

/**
 * @class SaveRecordResponse - Response from saving a record
 */
export class SaveRecordResponse extends CreatedWithIdResponse<number> {
  /**
   * @property {string[]} warnings - The warnings from saving the record.
   */
  public warnings: string[];

  /**
   * @constructor - Creates a new instance of SaveRecordResponse.
   * @param {number} id - The id of the record.
   * @param {string[]} warnings - The warnings from saving the record.
   * @returns {SaveRecordResponse} - A new instance of SaveRecordResponse.s
   */
  constructor(id: number, warnings: string[] = []) {
    super(id);
    this.warnings = warnings;
  }
}
