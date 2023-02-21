import { DataFormat } from '../enums/DataFormat.js';

/**
 * @class GetRecordsRequest - Request to get records by their ids
 */
export class GetRecordsRequest {
  /**
   * @property {number} appId - The id of the app the records belong to.
   */
  appId: number;

  /**
   * @property {number[]} recordIds - The ids of the records to get.
   */
  recordIds: number[];

  /**
   * @property {number[]} fieldIds - The ids of the fields to include in the response.
   */
  fieldIds: number[];

  /**
   * @property {DataFormat} dataFormat - The format of the data in the response.
   */
  dataFormat: DataFormat;

  /**
   * @constructor - Creates a new instance of GetRecordsRequest
   * @param {number} appId - The id of the app the records belong to.
   * @param {number[]} recordIds - The ids of the records to get.
   * @param {number[]} fieldIds - The ids of the fields to include in the response.
   * @param {DataFormat} dataFormat - The format of the data in the response.
   */
  constructor(
    appId: number,
    recordIds: number[],
    fieldIds: number[] = [],
    dataFormat: DataFormat = DataFormat.Raw
  ) {
    this.appId = appId;
    this.recordIds = recordIds;
    this.fieldIds = fieldIds;
    this.dataFormat = dataFormat;
  }
}
