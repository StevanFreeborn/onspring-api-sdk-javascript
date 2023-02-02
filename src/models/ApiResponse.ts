import { App } from "./App";
import { GetPagedAppsResponse } from "./GetPagedAppsResponse";

/**
 * @class ApiResponse - A generic response object for API requests.
 */
export class ApiResponse<T> {
  /**
   * @property {number} statusCode - The status code of the response.
   */
  public statusCode: number;

  /**
   * @property {boolean} isSuccessful - True if the status code is less than 400; otherwise, false.
   */
  public isSuccessful: boolean;

  /**
   * @property {string} message - The message of the response.
   */
  public message: string;

  /**
   * @property {T} data - The data of the response.
   */
  public data: T;

  /**
   * @constructor - Creates a new instance of the ApiResponse class.
   * @param {number} statusCode - The status code of the response.
   * @param {string} message - The message of the response.
   * @param {T} data - The data of the response.
   * @returns {ApiResponse<T>} - A new instance of the ApiResponse class.
   */
  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.isSuccessful = statusCode < 400;
    this.message = message;
    this.data = data;
  }

  /**
   * @method AsGetPagedAppsResponseType - Converts the ApiResponse to an ApiResponse<GetPagedAppsResponse>.
   * @returns {ApiResponse<GetPagedAppsResponse>} - An ApiResponse<GetPagedAppsResponse>.
  */
  public AsGetPagedAppsResponseType(): ApiResponse<GetPagedAppsResponse> {
    var apiResponse = this as ApiResponse<any>;
    var apps = apiResponse.data.items.map((item: any) => {
      return new App(item.href, item.id, item.name);
    });

    var getAppsPagedResponse = new GetPagedAppsResponse(
      apps,
      apiResponse.data.pageNumber,
      apiResponse.data.pageSize,
      apiResponse.data.totalPages,
      apiResponse.data.totalRecords
    );

    return new ApiResponse<GetPagedAppsResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      getAppsPagedResponse
    );
  }
}
