import { type RecordValue } from './RecordValue';

/**
 * @class Record - A record in an app.
 */
export class Record {
  /**
   * @property {number} appId - The id of the app that the record belongs to.
   */
  public appId: number;

  /**
   * @property {number} recordId - The id of the record.
   */
  public recordId: number;

  /**
   * @property {Array<RecordValue<any>>} fieldData - The data for the fields in the record.
   */
  public fieldData: Array<RecordValue<any>>;

  /**
   * @constructor - Creates a new instance of Record.
   * @param {number} appId - The id of the app that the record belongs to.
   * @param {number} recordId - The id of the record.
   * @param {Array<RecordValue<any>>} fieldData - The data for the fields in the record.
   * @returns {Record} - A new instance of Record.
   */
  constructor(
    appId: number,
    recordId: number,
    fieldData: Array<RecordValue<any>>
  ) {
    this.appId = appId;
    this.recordId = recordId;
    this.fieldData = fieldData;
  }
}
