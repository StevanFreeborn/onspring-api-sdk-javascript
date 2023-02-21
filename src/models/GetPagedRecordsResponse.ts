import { PagedResponse } from './PagedResponse.js';
import { type Record } from './Record.js';

/**
 * @class GetPagedRecordsResponse - A response containing a paged collection of records.
 */
export class GetPagedRecordsResponse extends PagedResponse<Record> {
  /**
   * @constructor - Creates a new instance of the GetPagedRecordsResponse class.
   * @param {Record[]} items - The items in the collection.
   * @param {number} pageNumber - The page number of the response.
   * @param {number} pageSize - The page size of the response.
   * @param {number} totalPages - The total number of pages in the response.
   * @param {number} totalRecords - The total number of records in the response.
   * @returns {GetPagedRecordsResponse} - A new instance of the GetPagedRecordsResponse class.
   */
  constructor(
    items: Record[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
