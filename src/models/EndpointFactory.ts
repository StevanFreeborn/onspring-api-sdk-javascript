export class EndpointFactory {
  public static getPingEndpoint(baseUrl: string): string {
    return `${baseUrl}/Ping`;
  }

  public static getAppsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Apps`;
  }

  public static getAppByIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Apps/id/${id}`;
  }

  public static getAppsByIdsEndpoint(baseUrl: string): string {
    return `${baseUrl}/Apps/batch-get`;
  }

  public static getFieldByIdEndpoint(baseUrl: string, id: number): string {
    return `${baseUrl}/Fields/id/${id}`;
  }

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
