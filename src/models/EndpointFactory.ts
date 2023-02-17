/**
 * @class EndpointFactory - A factory class for creating endpoints.
 */
export class EndpointFactory {
  /**
   * @method getPingEndpoint - Gets the ping endpoint.
   * @returns {string} - The ping endpoint.
   */
  public static getPingEndpoint(): string {
    return '/Ping';
  }

  /**
   * @method getAppsEndpoint - Gets the apps endpoint.
   * @returns {string} - The apps endpoint.
   */
  public static getAppsEndpoint(): string {
    return `/Apps`;
  }

  /**
   * @method getAppByIdEndpoint - Gets the app by id endpoint.
   * @param {number} id - The id of the app.
   * @returns {string} - The app by id endpoint.
   */
  public static getAppByIdEndpoint(id: number): string {
    return `/Apps/id/${id}`;
  }

  /**
   * @method getAppsByIdsEndpoint - Gets the apps by ids endpoint.
   * @returns {string} - The apps by ids endpoint.
   */
  public static getAppsByIdsEndpoint(): string {
    return '/Apps/batch-get';
  }

  /**
   * @method getRecordsEndpoint - Gets the records endpoint.
   * @param {number} id - The id of the field.
   * @returns {string} - The field by id endpoint.
   */
  public static getFieldByIdEndpoint(id: number): string {
    return `/Fields/id/${id}`;
  }

  /**
   * @method getFieldsByIdsEndpoint - Gets the fields by ids endpoint.
   * @returns {string} - The fields by ids endpoint.
   */
  public static getFieldsByIdsEndpoint(): string {
    return '/Fields/batch-get';
  }

  /**
   * @method getFieldsByAppIdEndpoint - Gets the fields by app id endpoint.
   * @param {number} id - The id of the app.
   * @returns {string} - The fields by app id endpoint.
   */
  public static getFieldsByAppIdEndpoint(id: number): string {
    return `/Fields/appId/${id}`;
  }

  /**
   * @method getRecordsEndpoint - Gets the records endpoint.
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
   * @method getDeleteFileByIdEndpoint - Gets the delete file by id endpoint.
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
    return `/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}`;
  }

  /**
   * @method getFileByIdEndpoint - Gets the file by id endpoint.
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
   * @method getSaveFileEndpoint - Gets the save file endpoint.
   * @returns {string} - The save file endpoint.
   */
  public static getSaveFileEndpoint(): string {
    return '/Files';
  }

  /**
   * @method getAddOrUpdateListItemEndpoint - Gets the add or update list item endpoint.
   * @param {number} listId - The id of the list.
   * @returns {string} - The add or update list item endpoint.
   */
  public static getAddOrUpdateListItemEndpoint(listId: number): string {
    return `/Lists/id/${listId}/items`;
  }

  /**
   * @method getDeleteListItemEndpoint - Gets the delete list item endpoint.
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
   * @method getRecordsByAppIdEndpoint - Gets the get records by app id endpoint.
   * @param {number} appId - The id of the app.
   * @returns {string} - The get records by app id endpoint.
   */
  public static getRecordsByAppIdEndpoint(appId: number): string {
    return `/Records/appId/${appId}`;
  }

  /**
   * @method getRecordByIdEndpoint - Gets the get record by id endpoint.
   * @param {number} appId - The id of the app.
   * @param {number} recordId - The id of the record.
   * @returns {string} - The get record by id endpoint.
   */
  public static getRecordByIdEndpoint(appId: number, recordId: number): string {
    return `/Records/appId/${appId}/recordId/${recordId}`;
  }

  /**
   * @method getDeleteRecordByIdEndpoint - Gets the delete record by id endpoint.
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
   * @method getRecordsByIdsEndpoint - Gets the get records by ids endpoint.
   * @returns {string} - The get records by ids endpoint.
   */
  public static getRecordsByIdsEndpoint(): string {
    return '/Records/batch-get';
  }

  /**
   * @method getQueryRecordsEndpoint - Gets the query records endpoint.
   * @returns {string} - The query records endpoint.
   */
  public static getQueryRecordsEndpoint(): string {
    return '/Records/query';
  }

  /**
   * @method getAddOrUpdateRecordEndpoint - Gets the add or update record endpoint.
   * @returns {string} - The add or update record endpoint.
   */
  public static getAddOrUpdateRecordEndpoint(): string {
    return '/Records';
  }

  /**
   * @method getDeleteRecordsByIdsEndpoint - Gets the delete records by ids endpoint.
   * @returns {string} - The delete records by ids endpoint.
   */
  public static getDeleteRecordsByIdsEndpoint(): string {
    return '/Records/batch-delete';
  }

  /**
   * @method getReportByIdEndpoint - Gets the get report by id endpoint.
   * @param {number} reportId - The id of the report.
   * @returns {string} - The get report by id endpoint.
   */
  public static getReportByIdEndpoint(reportId: number): string {
    return `/Reports/id/${reportId}`;
  }

  /**
   * @method getReportsByAppIdEndpoint - Gets the get reports by app id endpoint.
   * @param {number} appId - The id of the app.
   * @returns {string} - The get reports by app id endpoint.
   */
  public static getReportsByAppIdEndpoint(appId: number): string {
    return `/Reports/appId/${appId}`;
  }
}
