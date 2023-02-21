import { DataFormat } from '../enums/DataFormat';
import { PagingRequest } from './PagingRequest';

/**
 * @class GetRecordsByAppIdRequest - Represents a request to get records by app id.
 */
export class GetRecordsByAppIdRequest {
  /**
   * @property {number} appId - The id of the app that the records belong to.
   */
  public appId: number;

  /**
   * @property {number[]} fieldIds - The ids of the fields to include in the response.
   */
  public fieldIds: number[];

  /**
   * @property {DataFormat} dataFormat - The format of the data in the response.
   */
  public dataFormat: DataFormat = DataFormat.Raw;

  /**
   * @property {PagingRequest} pagingRequest - The paging request.
   */
  public pagingRequest: PagingRequest;

  /**
   *@constructor - Creates a new instance of GetRecordsByAppIdRequest.
   * @param {number} appId - The id of the app that the records belong to.
   * @param {number[]} fieldIds - The ids of the fields to include in the response.
   * @param {DataFormat} dataFormat - The format of the data in the response.
   * @param {PagingRequest} pagingRequest - The paging request.
   * @returns {GetRecordsByAppIdRequest} - A new instance of GetRecordsByAppIdRequest.
   */
  constructor(
    appId: number,
    fieldIds: number[] = [],
    dataFormat: DataFormat = DataFormat.Raw,
    pagingRequest: PagingRequest = new PagingRequest(1, 50)
  ) {
    this.appId = appId;
    this.fieldIds = fieldIds;
    this.dataFormat = dataFormat;
    this.pagingRequest = pagingRequest;
  }
}
