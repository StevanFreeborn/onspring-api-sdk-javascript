import { type Field } from './Field';
import { PagedResponse } from './PagedResponse';

/**
 * @class GetPagedFieldsResponse - A response containing a paged collection of fields.
 */
export class GetPagedFieldsResponse extends PagedResponse<Field> {
  /**
   * @constructor - Creates a new instance of the GetPagedAppsResponse class.
   * @param {Field[]} items - The items in the collection.
   * @param {number} pageNumber - The page number of the response.
   * @param {number} pageSize - The page size of the response.
   * @param {number} totalPages - The total number of pages in the response.
   * @param {number} totalRecords - The total number of records in the response.
   * @returns {GetPagedAppsResponse} - A new instance of the GetPagedAppsResponse class.
   */
  constructor(
    items: Field[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
