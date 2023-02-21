import { PagedResponse } from './PagedResponse.js';
import { type Report } from './Report.js';

/**
 * @class GetPagedReportsResponse - Represents a response containing a paged list of reports.
 */
export class GetPagedReportsResponse extends PagedResponse<Report> {
  /**
   * @constructor - Creates a new instance of the GetPagedReportsResponse class.
   * @param {Report[]} items - The list of reports.
   * @param {number} pageNumber - The page number.
   * @param {number} pageSize - The page size.
   * @param {number} totalPages - The total number of pages.
   * @param {number} totalRecords - The total number of records.
   * @returns {GetPagedReportsResponse} - A new instance of the GetPagedReportsResponse class.
   */
  constructor(
    items: Report[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
