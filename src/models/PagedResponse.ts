/**
 * @class PagedResponse - A generic paged response model
 */
export class PagedResponse<T> {
  /**
   * @property {T[]} items - The items in the collection.
   */
  public items: T[];

  /**
   * @property {number} pageNumber - The page number of the response.
   */
  public pageNumber: number;

  /**
   * @property {number} pageSize - The page size of the response.
   */
  public pageSize: number;

  /**
   * @property {number} totalPages - The total number of pages in the response.
   */
  public totalPages: number;

  /**
   * @property {number} totalRecords - The total number of records in the response.
   */
  public totalRecords: number;

  /**
   * @constructor - Creates a new instance of the PagedResponse class.
   * @param {T[]} items - The items in the collection.
   * @param {number} pageNumber - The page number of the response.
   * @param {number} pageSize - The page size of the response.
   * @param {number} totalPages - The total number of pages in the response.
   * @param {number} totalRecords - The total number of records in the response.
   * @returns {PagedResponse<T>} - A new instance of the PagedResponse class.
   */
  constructor(
    items: T[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    this.items = items;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.totalRecords = totalRecords;
  }
}
