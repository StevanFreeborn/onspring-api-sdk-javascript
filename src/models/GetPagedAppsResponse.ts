import { PagedResponse } from './PagedResponse';
import { type App } from './App';

/**
 * @class GetPagedAppsResponse - A paged response model for the GetApps method.
 */
export class GetPagedAppsResponse extends PagedResponse<App> {
  /**
   * @constructor - Creates a new instance of the GetPagedAppsResponse class.
   * @param {App[]} items - The items in the collection.
   * @param {number} pageNumber - The page number of the response.
   * @param {number} pageSize - The page size of the response.
   * @param {number} totalPages - The total number of pages in the response.
   * @param {number} totalRecords - The total number of records in the response.
   * @returns {GetPagedAppsResponse} - A new instance of the GetPagedAppsResponse class.
   */
  constructor(
    items: App[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
