import { type DataFormat } from '../enums/DataFormat';

/**
 * @class GetRecordRequest - A request to get a record.
 */
export class GetRecordRequest {
  /**
   * @property {number} appId - The id of the app that the record belongs to.
   */
  public appId: number;

  /**
   * @property {number} recordId - The id of the record.
   */
  public recordId: number;

  /**
   * @property {number[]} fieldIds - The ids of the fields to include in the response.
   */
  public fieldIds: number[];

  /**
   * @property {DataFormat} dataFormat - The format of the data in the response.
   */
  public dataFormat: DataFormat;

  /**
   * @constructor - Creates a new instance of GetRecordRequest.
   * @param {number} appId - The id of the app that the record belongs to.
   * @param {number} recordId - The id of the record.
   * @param {number[]} fieldIds - The ids of the fields to include in the response.
   * @param {DataFormat} dataFormat - The format of the data in the response.
   * @returns {GetRecordRequest} - A new instance of GetRecordRequest.
   */
  constructor(
    appId: number,
    recordId: number,
    fieldIds: number[],
    dataFormat: DataFormat
  ) {
    this.appId = appId;
    this.recordId = recordId;
    this.fieldIds = fieldIds;
    this.dataFormat = dataFormat;
  }
}
