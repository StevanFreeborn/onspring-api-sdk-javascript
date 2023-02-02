import { PagingRequest } from './PagingRequest';

/**
 * @class EndpointFactory - A factory class for creating endpoints.
 */
export class EndpointFactory {
  /**
   * @param {string} baseUrl - The base url that will be used to create the ping endpoint.
   * @returns {string} - The ping endpoint.
   */
  public static getPingEndpoint(baseUrl: string): string {
    return `${baseUrl}/Ping`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the apps endpoint.
   * @returns {string} - The apps endpoint.
   */
  public static getAppsEndpoint(
    baseUrl: string,
    pagingRequest: PagingRequest
  ): string {
    return `${baseUrl}/Apps?pageSize=${pagingRequest.pageSize}&pageNumber=${pagingRequest.pageNumber}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the app by id endpoint.
   * @param {number} id - The id of the app.
   * @returns {string} - The app by id endpoint.
   */
  public static getAppByIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Apps/id/${id}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the apps by ids endpoint.
   * @returns {string} - The apps by ids endpoint.
   */
  public static getAppsByIdsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Apps/batch-get`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the field by id endpoint.
   * @param {number} id - The id of the field.
   * @returns {string} - The field by id endpoint.
   */
  public static getFieldByIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Fields/id/${id}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the fields by ids endpoint.
   * @returns {string} - The fields by ids endpoint.
   */
  public static getFieldsByIdsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Fields/batch-get`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the fields by app id endpoint.
   * @param {number} id - The id of the app.
   * @returns {string} - The fields by app id endpoint.
   */
  public static getFieldsByAppIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Fields/appId/${id}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the file info by id endpoint.
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The file info by id endpoint.
   */
  public static getFileInfoByIdEndpoint(
    baseUrl: string,
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the delete file by id endpoint.
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The delete file by id endpoint.
   */
  public static getDeleteFileByIdEndpoint(
    baseUrl: string,
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get file by id endpoint.
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The file by id endpoint.
   */
  public static getFileByIdEndpoint(
    baseUrl: string,
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the save file endpoint.
   * @returns {string} - The save file endpoint.
   */
  public static getSaveFileEndpoint(baseUrl: string): string {
    return `${baseUrl}/Files`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the add or update list item endpoint.
   * @param {number} listId - The id of the list.
   * @returns {string} - The add or update list item endpoint.
   */
  public static getAddOrUpdateListItemEndpoint(
    baseUrl: string,
    listId: number
  ): string {
    return `${baseUrl}/Lists/id/${listId}/items`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the delete list item endpoint.
   * @param {number} listId - The id of the list.
   * @param {string} itemId - The id of the list item.
   * @returns {string} - The delete list item endpoint.
   */
  public static getDeleteListItemEndpoint(
    baseUrl: string,
    listId: number,
    itemId: string
  ): string {
    return `${baseUrl}/Lists/id/${listId}/itemId/${itemId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get records by app id endpoint.
   * @param {number} appId - The id of the app.
   * @returns {string} - The get records by app id endpoint.
   */
  public static getRecordsByAppIdEndpoint(
    baseUrl: string,
    appId: number
  ): string {
    return `${baseUrl}/Records/appId/${appId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get record by id endpoint.
   * @param {number} appId - The id of the app.
   * @param {number} recordId - The id of the record.
   * @returns {string} - The get record by id endpoint.
   */
  public static getRecordByIdEndpoint(
    baseUrl: string,
    appId: number,
    recordId: number
  ): string {
    return `${baseUrl}/Records/appId/${appId}/recordId/${recordId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the delete record by id endpoint.
   * @param {number} appId - The id of the app.
   * @param {number} recordId - The id of the record.
   * @returns {string} - The delete record by id endpoint.
   */
  public static getDeleteRecordByIdEndpoint(
    baseUrl: string,
    appId: number,
    recordId: number
  ): string {
    return `${baseUrl}/Records/appId/${appId}/recordId/${recordId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get records by ids endpoint.
   * @returns {string} - The get records by ids endpoint.
   */
  public static getRecordsByIdsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Records/batch-get`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the query records endpoint.
   * @returns {string} - The query records endpoint.
   */
  public static getQueryRecordsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Records/query`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the add or update record endpoint.
   * @returns {string} - The add or update record endpoint.
   */
  public static getAddOrUpdateRecordEndpoint(baseUrl: string): string {
    return `${baseUrl}/Records`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the delete records by ids endpoint.
   * @returns {string} - The delete records by ids endpoint.
   */
  public static getDeleteRecordsByIdsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Records/batch-delete`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get report by id endpoint.
   * @param {number} reportId - The id of the report.
   * @returns {string} - The get report by id endpoint.
   */
  public static getReportByIdEndpoint(
    baseUrl: string,
    reportId: number
  ): string {
    return `${baseUrl}/Reports/id/${reportId}`;
  }

  /**
   * @param {string} baseUrl - The base url that will be used to create the get reports by app id endpoint.
   * @param {number} appId - The id of the app.
   * @returns {string} - The get reports by app id endpoint.
   */
  public static getReportsByAppIdEndpoint(
    baseUrl: string,
    appId: number
  ): string {
    return `${baseUrl}/Reports/appId/${appId}`;
  }
}
