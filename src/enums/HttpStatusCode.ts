/**
 * @enum HttpStatusCode - Enum for HTTP status codes
 */
export enum HttpStatusCode {
  /**
   * @constant OK - The request was successful.
   * @type {number}
   */
  OK = 200,

  /**
   * @constant Created - The request was successful and a new resource was created.
   * @type {number}
   */
  Created = 201,

  /**
   * @constant Accepted - The request was accepted for processing.
   * @type {number}
   */
  Accepted = 202,

  /**
   * @constant NoContent - The request was successful but there is no content to return.
   * @type {number}
   */
  NoContent = 204,

  /**
   * @constant BadRequest - The request was invalid.
   * @type {number}
   */
  BadRequest = 400,

  /**
   * @constant Unauthorized - The request did not include an authentication token.
   * @type {number}
   */
  Unauthorized = 401,

  /**
   * @constant Forbidden - The request included an authentication token but the token was not valid.
   * @type {number}
   */
  Forbidden = 403,

  /**
   * @constant NotFound - The requested resource does not exist.
   * @type {number}
   */
  NotFound = 404,

  /**
   * @constant MethodNotAllowed - The requested method is not supported for the resource.
   * @type {number}
   */
  MethodNotAllowed = 405,

  /**
   * @constant Conflict - The request could not be completed due to a conflict with the current state of the resource.
   * @type {number}
   */
  Conflict = 409,

  /**
   * @constant InternalServerError - An unexpected error occurred on the server.
   * @type {number}
   */
  InternalServerError = 500,

  /**
   * @constant NotImplemented - The requested method is not implemented.
   * @type {number}
   */
  NotImplemented = 501,

  /**
   * @constant BadGateway - The server received an invalid response from an upstream server.
   * @type {number}
   */
  BadGateway = 502,

  /**
   * @constant ServiceUnavailable - The server is currently unavailable.
   * @type {number}
   */
  ServiceUnavailable = 503,

  /**
   * @constant GatewayTimeout - The server did not receive a response from an upstream server in a timely manner.
   * @type {number}
   */
  GatewayTimeout = 504,
}
