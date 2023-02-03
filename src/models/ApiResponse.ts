import { App } from './App';
import { CollectionResponse } from './CollectionResponse';
import { Field } from './Field';
import { GetPagedAppsResponse } from './GetPagedAppsResponse';

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
  public data: T | null;

  /**
   * @constructor - Creates a new instance of the ApiResponse class.
   * @param {number} statusCode - The status code of the response.
   * @param {string} message - The message of the response.
   * @param {T | null} data - The data of the response.
   * @returns {ApiResponse<T>} - A new instance of the ApiResponse class.
   */
  constructor(statusCode: number, message: string, data: T | null) {
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
    const apiResponse = this as ApiResponse<any>;

    const apps = apiResponse.data.items.map((item: any) => {
      return new App(item.href, item.id, item.name);
    });

    const getAppsPagedResponse = new GetPagedAppsResponse(
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

  /**
   * @method AsAppType - Converts the ApiResponse to an ApiResponse<App>.
   * @returns {ApiResponse<App>} - An ApiResponse<App>.
   */
  public AsAppType(): ApiResponse<App> {
    const apiResponse = this as ApiResponse<any>;

    const app = new App(
      apiResponse.data.href,
      apiResponse.data.id,
      apiResponse.data.name
    );

    return new ApiResponse<App>(
      apiResponse.statusCode,
      apiResponse.message,
      app
    );
  }

  /**
   * @method AsAppCollectionType - Converts the ApiResponse to an ApiResponse<CollectionResponse<App>>.
   * @returns {ApiResponse<CollectionResponse<App>>} - An ApiResponse<CollectionResponse<App>>.
   */
  public AsAppCollectionType(): ApiResponse<CollectionResponse<App>> {
    const apiResponse = this as ApiResponse<any>;

    const apps = apiResponse.data.items.map((item: any) => {
      return new App(item.href, item.id, item.name);
    });

    const collectionResponse = new CollectionResponse<App>(
      apiResponse.data.count,
      apps
    );

    return new ApiResponse<CollectionResponse<App>>(
      apiResponse.statusCode,
      apiResponse.message,
      collectionResponse
    );
  }

  /**
   * @method AsFieldType - Converts the ApiResponse to an ApiResponse<Field>.
   * @returns {ApiResponse<Field>} - An ApiResponse<Field>.
   */
  public AsFieldType(): ApiResponse<Field> {
    const apiResponse = this as ApiResponse<any>;

    const field = new Field(
      apiResponse.data.id,
      apiResponse.data.appId,
      apiResponse.data.name,
      apiResponse.data.type,
      apiResponse.data.status,
      apiResponse.data.isRequired,
      apiResponse.data.isUnique
    );

    return new ApiResponse<Field>(
      apiResponse.statusCode,
      apiResponse.message,
      field
    );
  }
}
