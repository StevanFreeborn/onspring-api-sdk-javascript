import { type AxiosResponse } from 'axios';
import { type Readable } from 'stream';
import { HttpStatusCode } from '../enums/HttpStatusCode.js';
import { ApiResponse } from './ApiResponse.js';

/**
 * @class ApiResponseFactory - Factory class for creating ApiResponse objects
 */
export class ApiResponseFactory {
  /**
   * @method getApiResponse - Creates an ApiResponse object from an AxiosResponse object
   * @param {AxiosResponse} response - The AxiosResponse object that will be used to create the ApiResponse object
   * @returns {Promise<ApiResponse<T>>} - A promise that resolves to an ApiResponse object
   */
  public static async getApiResponse<T>(
    response: AxiosResponse
  ): Promise<ApiResponse<T>> {
    const message = await this.TryToGetMessage(response);

    if (this.isSuccessStatusCode(response.status) === true) {
      return new ApiResponse<T>(response.status, message, response.data);
    }

    return new ApiResponse<T>(response.status, message, null);
  }

  /**
   * @method TryToGetMessage - Attempts to get the message from the response data
   * @param {AxiosResponse} response - The AxiosResponse object that will be used to get the message
   * @returns {Promise<string>} - A promise that resolves to the message
   */
  private static async TryToGetMessage(
    response: AxiosResponse
  ): Promise<string> {
    if (
      response.status === HttpStatusCode.Unauthorized ||
      response.status === HttpStatusCode.Forbidden ||
      response.status === HttpStatusCode.NotFound
    ) {
      if (response.config.responseType === 'stream') {
        const dataString = await this.getStreamDataAsString(response.data);
        const dataObject =
          dataString.length > 0 ? JSON.parse(dataString) : '{}';
        return dataObject.message;
      }

      return response.data?.message;
    }

    if (this.isSuccessStatusCode(response.status) === false) {
      if (response.config.responseType === 'stream') {
        const data = response.data as Readable;
        return await this.getStreamDataAsString(data);
      }

      return JSON.stringify(response.data);
    }

    return '';
  }

  /**
   * @method getStreamDataAsString - Gets the data from a stream as a string
   * @param {Readable} stream - The stream that will be used to get the data
   * @returns {Promise<string>} - A promise that resolves to the data from the stream as a string
   */
  private static async getStreamDataAsString(
    stream: Readable
  ): Promise<string> {
    const chunks = [] as Buffer[];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString('utf-8');
  }

  /**
   * @method isSuccessStatusCode - Determines if the specified status code is a success status code
   * @param {number} statusCode - The status code that will be used to determine if it is a success status code
   * @returns {boolean} - A boolean indicating if the specified status code is a success status code
   */
  private static isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= HttpStatusCode.OK && statusCode <= 299;
  }
}
