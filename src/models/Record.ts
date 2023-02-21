import { type RecordValue } from './RecordValue';
import { SaveRecordRequest } from './SaveRecordRequest';

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
  public recordId: number | null;

  /**
   * @property {RecordValue[]} fieldData - The data for the fields in the record.
   */
  public fieldData: Array<RecordValue<any>>;

  /**
   * @constructor - Creates a new instance of Record.
   * @param {number} appId - The id of the app that the record belongs to.
   * @param {number} recordId - The id of the record.
   * @param {RecordValue<any>[]} fieldData - The data for the fields in the record.
   * @returns {Record} - A new instance of Record.
   */
  constructor(
    appId: number,
    recordId: number | null,
    fieldData: Array<RecordValue<any>> = []
  ) {
    this.appId = appId;
    this.recordId = recordId;
    this.fieldData = fieldData;
  }

  /**
   * @method addValue - Adds a value to the record.
   * @param {RecordValue<any>} fieldData - The value to add to the record.
   * @returns {void}
   */
  public addValue(fieldData: RecordValue<any>): void {
    this.fieldData.push(fieldData);
  }

  /**
   * @method addValues - Adds values to the record.
   * @param {Array<RecordValue<any>>} fieldData - The values to add to the record.
   * @returns {void}
   */
  public addValues(fieldData: Array<RecordValue<any>>): void {
    this.fieldData = this.fieldData.concat(fieldData);
  }

  /**
   * @method convertToSaveRecordRequest - Converts the record to a SaveRecordRequest.
   * @returns {SaveRecordRequest} - A SaveRecordRequest.
   */
  public convertToSaveRecordRequest(): SaveRecordRequest {
    const fields = this.fieldData.reduce((acc, cur) => {
      acc.set(cur.fieldId, cur.value);
      return acc;
    }, new Map<number, any>());

    return new SaveRecordRequest(this.appId, this.recordId, fields);
  }
}
