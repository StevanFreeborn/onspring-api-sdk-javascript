import axios from 'axios';
import { PagingRequest } from './PagingRequest';
import { ArgumentValidator } from './ArgumentValidator';
import { EndpointFactory } from './EndpointFactory';
import { ApiResponseFactory } from './ApiResponseFactory';
import { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { type ApiResponse } from './ApiResponse';
import { type GetPagedAppsResponse } from './GetPagedAppsResponse';
import { type App } from './App';
import { type CollectionResponse } from './CollectionResponse';
import { type Field } from './Field';
import { type GetPagedFieldsResponse } from './GetPagedFieldsResponse';
import { type SaveFileRequest } from './SaveFileRequest';
import { type CreatedWithIdResponse } from './CreatedWithIdResponse';
import { type FileInfo } from './FileInfo';
import { type File } from './File';

/**
 * @class OnspringClient - A client that can communicate with the Onspring API.
 */
export class OnspringClient {
  /**
   * @readonly {AxiosInstance} client - The axios instance that will be used to make requests to the Onspring API.
   */
  private readonly _client: AxiosInstance;

  /**
   * @constructor - Creates a new instance of the OnspringClient class.
   * @param {string} baseUrl - The base url that will be used to make requests to the Onspring API.
   * @param {string} apiKey - The api key that will be used to authorize requests made by this client.
   * @throws {Error} - Thrown when the baseUrl is not a valid url.
   * @throws {Error} - Thrown when the apiKey is null/undefined/empty/whitespace.
   * @returns {OnspringClient} - A new instance of the OnspringClient class.
   */
  constructor(
    baseUrl: string | undefined | null,
    apiKey: string | undefined | null
  ) {
    if (ArgumentValidator.isValidUrl(baseUrl) === false || baseUrl === null) {
      throw new Error('baseUrl must be an absolute and well-formed URI.');
    }

    if (ArgumentValidator.isNullOrWhiteSpace(apiKey)) {
      throw new Error('apiKey cannot be null/empty/whitespace.');
    }

    this._client = axios.create({
      baseURL: baseUrl,
      headers: { 'x-apikey': apiKey, 'x-api-version': '2' },
    });
  }

  /**
   * @method canConnect - Determines if the client can connect to the Onspring API.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the client can connect to the Onspring API.
   */
  public async canConnect(): Promise<boolean> {
    const endpoint = EndpointFactory.getPingEndpoint();

    const response = await this.get<any>(endpoint);
    return response.isSuccessful;
  }

  /**
   * @method getApps - Gets a paged list of apps.
   * @param {PagingRequest} pagingRequest - The paging request that will be used to get the apps.
   * @returns {Promise<ApiResponse<GetPagedAppsResponse>>} - A promise that resolves to an ApiResponse of type GetPagedAppsResponse.
   */
  public async getApps(
    pagingRequest: PagingRequest = new PagingRequest(1, 50)
  ): Promise<ApiResponse<GetPagedAppsResponse>> {
    const endpoint = EndpointFactory.getAppsEndpoint(pagingRequest);

    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asGetPagedAppsResponseType();
  }

  /**
   * @method getAppById - Gets an app by its id.
   * @param {number} appId - The id of the app to get.
   * @returns {Promise<ApiResponse<App>>} - A promise that resolves to an ApiResponse of type App.
   */
  public async getAppById(appId: number): Promise<ApiResponse<App>> {
    const endpoint = EndpointFactory.getAppByIdEndpoint(appId);

    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asAppType();
  }

  /**
   * @method getAppsByIds - Gets a list of apps by their ids.
   * @param {number[]} appIds - The ids of the apps to get.
   * @returns {Promise<ApiResponse<CollectionResponse<App>>>} - A promise that resolves to an ApiResponse of type CollectionResponse<App>.
   */
  public async getAppsByIds(
    appIds: number[]
  ): Promise<ApiResponse<CollectionResponse<App>>> {
    const endpoint = EndpointFactory.getAppsByIdsEndpoint();
    const uniqueIds = [...new Set(appIds)];
    const apiResponse = await this.post<any>(endpoint, uniqueIds);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asAppCollectionType();
  }

  /**
   * @method getFieldById - Gets a field by its id.
   * @param {number} fieldId - The id of the field to get.
   * @returns {Promise<ApiResponse<Field>>} - A promise that resolves to an ApiResponse of type Field.
   */
  public async getFieldById(fieldId: number): Promise<ApiResponse<Field>> {
    const endpoint = EndpointFactory.getFieldByIdEndpoint(fieldId);
    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asFieldType();
  }

  /**
   * @method getFieldsByIds - Gets a list of fields by their ids.
   * @param {number[]} fieldIds - The ids of the fields to get.
   * @returns {Promise<ApiResponse<CollectionResponse<Field>>>} - A promise that resolves to an ApiResponse of type CollectionResponse<Field>.
   */
  public async getFieldsByIds(
    fieldIds: number[]
  ): Promise<ApiResponse<CollectionResponse<Field>>> {
    const endpoint = EndpointFactory.getFieldsByIdsEndpoint();
    const uniqueIds = [...new Set(fieldIds)];
    const apiResponse = await this.post<any>(endpoint, uniqueIds);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asFieldCollectionType();
  }

  /**
   * @method getFieldsByAppId - Gets a paged list of fields by an app id.
   * @param {number} appId - The id of the app to get the fields for.
   * @param {PagingRequest} pagingRequest - The paging request that will be used to get the fields.
   * @returns {Promise<ApiResponse<GetPagedFieldsResponse>>} - A promise that resolves to an ApiResponse of type GetPagedFieldsResponse.
   */
  public async getFieldsByAppId(
    appId: number,
    pagingRequest: PagingRequest = new PagingRequest(1, 50)
  ): Promise<ApiResponse<GetPagedFieldsResponse>> {
    const endpoint = EndpointFactory.getFieldsByAppIdEndpoint(
      appId,
      pagingRequest
    );
    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asGetPagedFieldsResponseType();
  }

  /**
   * @method getFileInfoById - Gets a file's information by its id.
   * @param {number} recordId - The id of the record that the file is attached to.
   * @param {number} fieldId - The id of the field that the file is attached to.
   * @param {number} fileId - The id of the file to get the information for.
   * @returns {Promise<ApiResponse<FileInfo>>} - A promise that resolves to an ApiResponse of type FileInfo.
   */
  public async getFileInfoById(
    recordId: number,
    fieldId: number,
    fileId: number
  ): Promise<ApiResponse<FileInfo>> {
    const endpoint = EndpointFactory.getFileInfoByIdEndpoint(
      recordId,
      fieldId,
      fileId
    );

    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asFileInfoType();
  }

  /**
   * @method getFileById - Gets a file by its id.
   * @param {number} recordId - The id of the record that the file is attached to.
   * @param {number} fieldId - The id of the field that the file is attached to.
   * @param {number} fileId - The id of the file to get.
   * @returns {Promise<ApiResponse<File>>} - A promise that resolves to an ApiResponse of type File.
   */
  public async getFileById(
    recordId: number,
    fieldId: number,
    fileId: number
  ): Promise<ApiResponse<File>> {
    const endpoint = EndpointFactory.getFileByIdEndpoint(
      recordId,
      fieldId,
      fileId
    );

    const response = await this._client.get(endpoint, {
      responseType: 'stream',
    });

    const apiResponse = ApiResponseFactory.getApiResponse<any>(response);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asFileType(response);
  }

  /**
   * @method saveFile - Saves a file to a record in Onspring.
   * @param {SaveFileRequest} request - The request that will be used to save the file.
   * @returns {Promise<ApiResponse<CreatedWithIdResponse>>} - A promise that resolves to an ApiResponse of type CreatedWithIdResponse.
   */
  public async saveFile(
    request: SaveFileRequest
  ): Promise<ApiResponse<CreatedWithIdResponse>> {
    const endpoint = EndpointFactory.getSaveFileEndpoint();
    const formData = request.asFormData();
    const apiResponse = await this.post<any>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.asCreatedWithIdResponseType();
  }

  public async deleteFileById(
    recordId: number,
    fieldId: number,
    fileId: number
  ): Promise<ApiResponse<any>> {
    const endpoint = EndpointFactory.getDeleteFileByIdEndpoint(
      recordId,
      fieldId,
      fileId
    );

    const apiResponse = await this.delete<any>(endpoint);

    return apiResponse;
  }

  /**
   * @method get - Makes a GET request to the specified endpoint.
   * @param {string} endpoint - The endpoint that will be used to make the request.
   * @param {AxiosRequestConfig} config - The configuration that will be used to make the request.
   * @returns {Promise<ApiResponse<T>>} - A promise that resolves to an ApiResponse of type T.
   */
  private async get<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const response = await this._client.get(endpoint, config);
    const apiResponse = ApiResponseFactory.getApiResponse<T>(response);
    return apiResponse;
  }

  /**
   * @method post - Makes a POST request to the specified endpoint.
   * @param {string} endpoint - The endpoint that will be used to make the request.
   * @param {any} data - The data that will be sent with the request.
   * @param {AxiosRequestConfig} config - The configuration that will be used to make the request.
   * @returns {Promise<ApiResponse<T>>} - A promise that resolves to an ApiResponse of type T.
   */
  private async post<T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const response = await this._client.post(endpoint, data, config);
    const apiResponse = ApiResponseFactory.getApiResponse<T>(response);
    return apiResponse;
  }

  private async delete<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const response = await this._client.delete(endpoint, config);
    const apiResponse = ApiResponseFactory.getApiResponse<T>(response);
    return apiResponse;
  }
}
