import { AxiosInstance } from 'axios';
import axios from 'axios';
import { ArgumentValidator } from './models/ArgumentValidator';
import { EndpointFactory } from './models/EndpointFactory';

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

  public async canConnect(): Promise<boolean> {
    const endpoint = EndpointFactory.getPingEndpoint(this._client.defaults.baseURL);
    try {
      var response = await this._client.get(endpoint);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  private async get<T>(endpoint: string): Promise<T> {
    const response = await this._client.get<T>(endpoint);
    return response.data;
  }
}
