import { AxiosResponse } from "axios";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import { ApiResponse } from "./ApiResponse";

/**
 * @class ApiResponseFactory - Factory class for creating ApiResponse objects
 */
export class ApiResponseFactory {
  /**
   * @method getApiResponse - Creates an ApiResponse object from an AxiosResponse object
   * @param {AxiosResponse} response - The AxiosResponse object that will be used to create the ApiResponse object
   * @returns {ApiResponse<T>} - An ApiResponse object of type T
   */
  public static getApiResponse<T>(response: AxiosResponse): ApiResponse<T> {
    const message = this.TryToGetMessage(response);
    
    if (this.isSuccessStatusCode(response.status) === true)
    {
      const data = response.data as T;
      return new ApiResponse<T>(response.status, message, data);
    }

    return new ApiResponse<T>(response.status, message, null);
  }

  /**
   * @method TryToGetMessage - Attempts to get the message from the response data
   * @param {AxiosResponse} response - The AxiosResponse object that will be used to get the message
   * @returns {string} - The message from the response data
   */
  private static TryToGetMessage(response: AxiosResponse): string {
    
    if (
      response.status == HttpStatusCode.Unauthorized || 
      response.status == HttpStatusCode.Forbidden || 
      response.status == HttpStatusCode.NotFound
    )
    {
      return response.data?.message;
    }
    
    if (this.isSuccessStatusCode(response.status) === false)
    {
      return JSON.stringify(response.data);
    }
    
    return "";
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
