import axios from 'axios';
import { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { ArgumentValidator } from './ArgumentValidator';
import { EndpointFactory } from './EndpointFactory';
import { ApiResponseFactory } from './ApiResponseFactory';
import { type ApiResponse } from './ApiResponse';
import { PagingRequest } from './PagingRequest';
import { type GetPagedAppsResponse } from './GetPagedAppsResponse';
import { type App } from './App';
import { type CollectionResponse } from './CollectionResponse';
import { type Field } from './Field';

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

    return apiResponse.AsGetPagedAppsResponseType();
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

    return apiResponse.AsAppType();
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
    const apiResponse = await this.post<any>(endpoint, appIds);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsAppCollectionType();
  }

  /**
   * @method getFieldById - Gets a field by its id.
   * @returns {Promise<ApiResponse<Field>>} - A promise that resolves to an ApiResponse of type Field.
   */
  public async getFieldById(fieldId: number): Promise<ApiResponse<Field>> {
    const endpoint = EndpointFactory.getFieldByIdEndpoint(fieldId);
    const apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsFieldType();
  }

  public async getFieldsByIds(
    fieldIds: number[]
  ): Promise<ApiResponse<CollectionResponse<Field>>> {
    const endpoint = EndpointFactory.getFieldsByIdsEndpoint();
    const uniqueIds = [...new Set(fieldIds)];
    const apiResponse = await this.post<any>(endpoint, uniqueIds);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsFieldCollectionType();
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
}
