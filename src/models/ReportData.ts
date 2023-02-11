import { type Row } from './Row';

/**
 * @class ReportData - Represents the data for a report.
 */
export class ReportData {
  /**
   * @property {string[]} columns - The columns in the report.
   */
  public columns: string[];

  /**
   * @property {Row[]} rows - The rows in the report.
   */
  public rows: Row[];

  /**
   * @constructor - Creates a new instance of ReportData.
   * @param {string[]} columns - The columns in the report.
   * @param {Row[]} rows - The rows in the report.
   * @returns {ReportData} - A new instance of ReportData.
   */
  constructor(columns: string[], rows: Row[]) {
    this.columns = columns;
    this.rows = rows;
  }
}
