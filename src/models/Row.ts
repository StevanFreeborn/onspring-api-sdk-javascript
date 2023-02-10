/**
 * @class Row - Represents a row of data in a report.
 */
export class Row {
  /**
   * @property {number} recordId - The id of the record that the row represents.
   */
  public recordId: number;

  /**
   * @property {any[]} cells - The cells in the row.
   */
  public cells: any[];

  /**
   * @constructor - Creates a new instance of Row.
   * @param {number} recordId - The id of the record that the row represents.
   * @param {any[]} cells - The cells in the row.
   * @returns {Row} - A new instance of Row.
   */
  constructor(recordId: number, cells: any[]) {
    this.recordId = recordId;
    this.cells = cells;
  }
}
