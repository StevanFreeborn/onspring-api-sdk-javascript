import { AxiosInstance } from 'axios';
import axios from 'axios';
import { ArgumentValidator } from './models/ArgumentValidator';
import { EndpointFactory } from './models/EndpointFactory';
import { ApiResponseFactory } from './models/ApiResponseFactory';
import { ApiResponse } from './models/ApiResponse';

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
    if (ArgumentValidator.isValidUrl(baseUrl) === false) {
      throw new Error('baseUrl must be an absolute and well-formed URI.');
    }

    if (ArgumentValidator.isNullOrWhiteSpace(apiKey)) {
      throw new Error('apiKey cannot be null/empty/whitespace.');
    }

    this._client = axios.create({
      baseURL: baseUrl,
      headers: {
        'x-apikey': apiKey,
        'x-api-version': '2',
      },
    });
  }

  /**
   * @method canConnect - Determines if the client can connect to the Onspring API.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the client can connect to the Onspring API.
   */
  public async canConnect(): Promise<boolean> {
    const endpoint = EndpointFactory.getPingEndpoint(
      this._client.defaults.baseURL
    );
    try {
      const response = await this.get<ApiResponse<boolean>>(endpoint);
      return response.isSuccessful;
    } catch (error) {
      return false;
    }
  }

  /**
   * @method get - Makes a GET request to the specified endpoint.
   * @param {string} endpoint - The endpoint that will be used to make the request.
   * @returns {Promise<ApiResponse<T>>} - A promise that resolves to an ApiResponse of type T.
   */
  private async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this._client.get(endpoint);
    const apiResponse = ApiResponseFactory.getApiResponse<T>(response);
    return apiResponse;
  }
}
