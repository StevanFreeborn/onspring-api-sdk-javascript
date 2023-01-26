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
  public static getAppsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Apps`;
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

  public static getFieldsByAppIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Fields/appId/${id}`;
  }

  public static getFileInfoByIdEndpoint(baseUrl: string, recordId: number, fieldId: number, fileId: number): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}`;
  }

  public static getDeleteFileByIdEndpoint(baseUrl: string, recordId: number, fieldId: number, fileId: number): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  public static getFileByIdEndpoint(baseUrl: string, recordId: number, fieldId: number, fileId: number): string {
    return `${baseUrl}/Files/recordId/${recordId}/fieldId/${fieldId}/fileId/${fileId}/file`;
  }

  public static getSaveFileEndpoint(baseUrl: string): string {
    return `${baseUrl}/Files`;
  }

  public static getAddOrUpdateListItemEndpoint(baseUrl: string, listId: number): string {
    return `${baseUrl}/Lists/id/${listId}/items`;
  }

  public static getDeleteListItemEndpoint(baseUrl: string, listId: number, itemId: string): string {
    return `${baseUrl}/Lists/id/${listId}/itemId/${itemId}`;
  }

  public static getRecordsByAppIdEndpoint(baseUrl: string, appId: number): string {
    return `${baseUrl}/Records/appId/${appId}`;
  }
}
