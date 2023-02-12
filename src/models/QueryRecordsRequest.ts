import { DataFormat } from '../enums/DataFormat';
import { PagingRequest } from './PagingRequest';

/**
 * @class QueryRecordsRequest - Request to query for records.
 */
export class QueryRecordsRequest {
  /**
   * @property {number} appId - The id of the app the records belong to.
   */
  appId: number;

  /**
   * @property {string} filter - The filter to use to query for records.
   */
  filter: string;

  /**
   * @property {number[]} fieldIds - The ids of the fields to include in the response.
   */
  fieldIds: number[];

  /**
   * @property {DataFormat} dataFormat - The format of the data in the response.
   */
  dataFormat: DataFormat;

  /**
   * @property {PagingRequest} pagingRequest - The paging request to use to query for records.
   */
  pagingRequest: PagingRequest;

  /**
   * @constructor - Creates a new instance of QueryRecordsRequest
   * @param {number} appId - The id of the app the records belong to.
   * @param {string} filter - The filter to use to query for records.
   * @param {number[]} fieldIds - The ids of the fields to include in the response.
   * @param {DataFormat} dataFormat - The format of the data in the response.
   * @param {PagingRequest} pagingRequest - The paging request to use to query for records.
   * @returns {QueryRecordsRequest} - A new instance of QueryRecordsRequest
   */
  constructor(
    appId: number,
    filter: string,
    fieldIds: number[] = [],
    dataFormat: DataFormat = DataFormat.Raw,
    pagingRequest: PagingRequest = new PagingRequest(1, 50)
  ) {
    this.appId = appId;
    this.filter = filter;
    this.fieldIds = fieldIds;
    this.dataFormat = dataFormat;
    this.pagingRequest = pagingRequest;
  }
}
