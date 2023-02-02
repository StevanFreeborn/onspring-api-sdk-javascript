import { PagingRequest } from './PagingRequest';

/**
 * @class EndpointFactory - A factory class for creating endpoints.
 */
export class EndpointFactory {
  /**
   * @returns {string} - The ping endpoint.
   */
  public static getPingEndpoint(): string {
    return '/Ping';
  }

  /**
   * @param {PagingRequest} pagingRequest - Pagination information to use as query params in the endpoint string.
   * @returns {string} - The apps endpoint.
   */
  public static getAppsEndpoint(pagingRequest: PagingRequest): string {
    return `/Apps?pageSize=${pagingRequest.pageSize}&pageNumber=${pagingRequest.pageNumber}`;
  }

  /**
   * @param {number} id - The id of the app.
   * @returns {string} - The app by id endpoint.
   */
  public static getAppByIdEndpoint(id: number): string {
    return `/Apps/id/${id}`;
  }

  /**
   * @returns {string} - The apps by ids endpoint.
   */
  public static getAppsByIdsEndpoint(): string {
    return '/Apps/batch-get';
  }

  /**
   * @param {number} id - The id of the field.
   * @returns {string} - The field by id endpoint.
   */
  public static getFieldByIdEndpoint(id: number): string {
    return `/Fields/id/${id}`;
  }

  /**
   * @returns {string} - The fields by ids endpoint.
   */
  public static getFieldsByIdsEndpoint(): string {
    return '/Fields/batch-get';
  }

  /**
   * @param {number} id - The id of the app.
   * @returns {string} - The fields by app id endpoint.
   */
  public static getFieldsByAppIdEndpoint(id: number): string {
    return `/Fields/appId/${id}`;
  }

  /**
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The file info by id endpoint.
   */
  public static getFileInfoByIdEndpoint(
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}`;
  }

  /**
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The delete file by id endpoint.
   */
  public static getDeleteFileByIdEndpoint(
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  /**
   * @param {number} recordId - The id of the record.
   * @param {number} fieldId - The id of the field.
   * @param {number} fileId - The id of the file.
   * @returns {string} - The file by id endpoint.
   */
  public static getFileByIdEndpoint(
    recordId: number,
    fieldId: number,
    fileId: number
  ): string {
    return `/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  /**
   * @returns {string} - The save file endpoint.
   */
  public static getSaveFileEndpoint(): string {
    return '/Files';
  }

  /**
   * @param {number} listId - The id of the list.
   * @returns {string} - The add or update list item endpoint.
   */
  public static getAddOrUpdateListItemEndpoint(listId: number): string {
    return `/Lists/id/${listId}/items`;
  }

  /**
   * @param {number} listId - The id of the list.
   * @param {string} itemId - The id of the list item.
   * @returns {string} - The delete list item endpoint.
   */
  public static getDeleteListItemEndpoint(
    listId: number,
    itemId: string
  ): string {
    return `/Lists/id/${listId}/itemId/${itemId}`;
  }

  /**
   * @param {number} appId - The id of the app.
   * @returns {string} - The get records by app id endpoint.
   */
  public static getRecordsByAppIdEndpoint(appId: number): string {
    return `/Records/appId/${appId}`;
  }

  /**
   * @param {number} appId - The id of the app.
   * @param {number} recordId - The id of the record.
   * @returns {string} - The get record by id endpoint.
   */
  public static getRecordByIdEndpoint(appId: number, recordId: number): string {
    return `/Records/appId/${appId}/recordId/${recordId}`;
  }

  /**
   * @param {number} appId - The id of the app.
   * @param {number} recordId - The id of the record.
   * @returns {string} - The delete record by id endpoint.
   */
  public static getDeleteRecordByIdEndpoint(
    appId: number,
    recordId: number
  ): string {
    return `/Records/appId/${appId}/recordId/${recordId}`;
  }

  /**
   * @returns {string} - The get records by ids endpoint.
   */
  public static getRecordsByIdsEndpoint(): string {
    return '/Records/batch-get';
  }

  /**
   * @returns {string} - The query records endpoint.
   */
  public static getQueryRecordsEndpoint(): string {
    return '/Records/query';
  }

  /**
   * @returns {string} - The add or update record endpoint.
   */
  public static getAddOrUpdateRecordEndpoint(): string {
    return '/Records';
  }

  /**
   * @returns {string} - The delete records by ids endpoint.
   */
  public static getDeleteRecordsByIdsEndpoint(): string {
    return '/Records/batch-delete';
  }

  /**
   * @param {number} reportId - The id of the report.
   * @returns {string} - The get report by id endpoint.
   */
  public static getReportByIdEndpoint(reportId: number): string {
    return `/Reports/id/${reportId}`;
  }

  /**
   * @param {number} appId - The id of the app.
   * @returns {string} - The get reports by app id endpoint.
   */
  public static getReportsByAppIdEndpoint(appId: number): string {
    return `/Reports/appId/${appId}`;
  }
}
