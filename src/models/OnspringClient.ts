import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ArgumentValidator } from './ArgumentValidator';
import { EndpointFactory } from './EndpointFactory';
import { ApiResponseFactory } from './ApiResponseFactory';
import { ApiResponse } from './ApiResponse';
import { PagingRequest } from './PagingRequest';
import { GetPagedAppsResponse } from './GetPagedAppsResponse';
import { App } from './App';
import { CollectionResponse } from './CollectionResponse';

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
   * @param pagingRequest - The paging request that will be used to get the apps.
   * @returns - A promise that resolves to an ApiResponse of type GetPagedAppsResponse.
   */
  public async getApps(
    pagingRequest: PagingRequest = new PagingRequest(1, 50)
  ): Promise<ApiResponse<GetPagedAppsResponse>> {
    const endpoint = EndpointFactory.getAppsEndpoint(pagingRequest);

    var apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsGetPagedAppsResponseType();
  }

  /**
   * @method getAppById - Gets an app by its id.
   * @param appId - The id of the app to get.
   * @returns - A promise that resolves to an ApiResponse of type App.
   */
  public async getAppById(appId: number): Promise<ApiResponse<App>> {
    const endpoint = EndpointFactory.getAppByIdEndpoint(appId);

    var apiResponse = await this.get<any>(endpoint);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsAppType();
  }

  /**
   * @method getAppsByIds - Gets a list of apps by their ids.
   * @param getAppsByIds - The ids of the apps to get.
   * @returns - A promise that resolves to an ApiResponse of type CollectionResponse<App>.
   */
  public async getAppsByIds(
    getAppsByIds: number[]
  ): Promise<ApiResponse<CollectionResponse<App>>> {
    const endpoint = EndpointFactory.getAppsByIdsEndpoint();
    const apiResponse = await this.post<any>(endpoint, getAppsByIds);

    if (apiResponse.isSuccessful === false) {
      return apiResponse;
    }

    return apiResponse.AsAppCollectionType();
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
   *
   * @param endpoint - The endpoint that will be used to make the request.
   * @param data - The data that will be sent with the request.
   * @param config - The configuration that will be used to make the request.
   * @returns - A promise that resolves to an ApiResponse of type T.
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