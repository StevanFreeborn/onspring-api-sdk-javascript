import { ArgumentValidator } from './ArgumentValidator';

/**
 * @class PagingRequest - Paging request model
 */
export class PagingRequest {
  /**
   * @property {number} pageNumber - The page number of the request.
   */
  pageNumber: number;

  /**
   * @property {number} pageSize - The page size of the request.
   */
  pageSize: number;

  /**
   * @constructor - Creates a new instance of the PagingRequest class.
   * @param {number} pageNumber - The page number of the request. Must be greater than 0.
   * @param {number} pageSize - The page size of the request. Must be greater than 0 and less than 1001.
   * @returns {PagingRequest} - A new instance of the PagingRequest class.
   * @throws {Error} - Thrown when the pageNumber is less than 1.
   * @throws {Error} - Thrown when the pageSize is less than 1 or greater than 1000.
   */
  constructor(pageNumber: number, pageSize: number) {
    if (ArgumentValidator.isValidPageNumber(pageNumber) === false) {
      throw new Error('pageNumber must be greater than 0.');
    }

    if (ArgumentValidator.isValidPageSize(pageSize) === false) {
      throw new Error('pageSize must be greater than 0 and less than 1001.');
    }

    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
