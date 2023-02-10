import { type AxiosResponse } from 'axios';
import { FieldStatus } from '../enums/FieldStatus';
import { FieldType } from '../enums/FieldType';
import { FormulaOutputType } from '../enums/FormulaOutputType';
import { Multiplicity } from '../enums/Multiplicity';
import { App } from './App';
import { CollectionResponse } from './CollectionResponse';
import { CreatedWithIdResponse } from './CreatedWithIdResponse';
import { Field } from './Field';
import { File } from './File';
import { FileInfo } from './FileInfo';
import { FormulaField } from './FormulaField';
import { GetPagedAppsResponse } from './GetPagedAppsResponse';
import { GetPagedFieldsResponse } from './GetPagedFieldsResponse';
import { GetPagedReportsResponse } from './GetPagedReportsResponse';
import { ListField } from './ListField';
import { ListItemResponse } from './ListItemResponse';
import { ListValue } from './ListValue';
import { ReferenceField } from './ReferenceField';
import { Report } from './Report';
import { ReportData } from './ReportData';
import { Row } from './Row';

/**
 * @class ApiResponse - A generic response object for API requests.
 */
export class ApiResponse<T> {
  /**
   * @property {number} statusCode - The status code of the response.
   */
  public statusCode: number;

  /**
   * @property {boolean} isSuccessful - True if the status code is less than 400; otherwise, false.
   */
  public isSuccessful: boolean;

  /**
   * @property {string} message - The message of the response.
   */
  public message: string;

  /**
   * @property {T} data - The data of the response.
   */
  public data: T | null;

  /**
   * @constructor - Creates a new instance of the ApiResponse class.
   * @param {number} statusCode - The status code of the response.
   * @param {string} message - The message of the response.
   * @param {T | null} data - The data of the response.
   * @returns {ApiResponse<T>} - A new instance of the ApiResponse class.
   */
  constructor(statusCode: number, message: string, data: T | null) {
    this.statusCode = statusCode;
    this.isSuccessful = statusCode < 400;
    this.message = message;
    this.data = data;
  }

  /**
   * @method asGetPagedAppsResponseType - Converts the ApiResponse to an ApiResponse<GetPagedAppsResponse>.
   * @returns {ApiResponse<GetPagedAppsResponse>} - An ApiResponse<GetPagedAppsResponse>.
   */
  public asGetPagedAppsResponseType(): ApiResponse<GetPagedAppsResponse> {
    const apiResponse = this as ApiResponse<any>;

    const apps = apiResponse.data.items.map((item: any) => {
      return new App(item.href, item.id, item.name);
    });

    const getAppsPagedResponse = new GetPagedAppsResponse(
      apps,
      apiResponse.data.pageNumber,
      apiResponse.data.pageSize,
      apiResponse.data.totalPages,
      apiResponse.data.totalRecords
    );

    return new ApiResponse<GetPagedAppsResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      getAppsPagedResponse
    );
  }

  /**
   * @method asAppType - Converts the ApiResponse to an ApiResponse<App>.
   * @returns {ApiResponse<App>} - An ApiResponse<App>.
   */
  public asAppType(): ApiResponse<App> {
    const apiResponse = this as ApiResponse<any>;

    const app = new App(
      apiResponse.data.href,
      apiResponse.data.id,
      apiResponse.data.name
    );

    return new ApiResponse<App>(
      apiResponse.statusCode,
      apiResponse.message,
      app
    );
  }

  /**
   * @method asAppCollectionType - Converts the ApiResponse to an ApiResponse<CollectionResponse<App>>.
   * @returns {ApiResponse<CollectionResponse<App>>} - An ApiResponse<CollectionResponse<App>>.
   */
  public asAppCollectionType(): ApiResponse<CollectionResponse<App>> {
    const apiResponse = this as ApiResponse<any>;

    const apps = apiResponse.data.items.map((item: any) => {
      return new App(item.href, item.id, item.name);
    });

    const collectionResponse = new CollectionResponse<App>(
      apiResponse.data.count,
      apps
    );

    return new ApiResponse<CollectionResponse<App>>(
      apiResponse.statusCode,
      apiResponse.message,
      collectionResponse
    );
  }

  /**
   * @method asFieldType - Converts the ApiResponse to an ApiResponse<Field>.
   * @returns {ApiResponse<Field>} - An ApiResponse<Field>.
   */
  public asFieldType(): ApiResponse<Field> {
    const apiResponse = this as ApiResponse<any>;
    const field = ApiResponse.getFieldByType(apiResponse.data);

    return new ApiResponse<Field>(
      apiResponse.statusCode,
      apiResponse.message,
      field
    );
  }

  /**
   * @method asFieldCollectionType - Converts the ApiResponse to an ApiResponse<CollectionResponse<Field>>.
   * @returns {ApiResponse<CollectionResponse<Field>>} - An ApiResponse<CollectionResponse<Field>>.
   */
  public asFieldCollectionType(): ApiResponse<CollectionResponse<Field>> {
    const apiResponse = this as ApiResponse<any>;

    const fields = apiResponse.data.items.map((item: any) =>
      ApiResponse.getFieldByType(item)
    );

    const collectionResponse = new CollectionResponse<Field>(
      apiResponse.data.count,
      fields
    );

    return new ApiResponse<CollectionResponse<Field>>(
      apiResponse.statusCode,
      apiResponse.message,
      collectionResponse
    );
  }

  /**
   * @method asGetPagedFieldsResponseType - Converts the ApiResponse to an ApiResponse<GetPagedFieldsResponse>.
   * @returns {ApiResponse<GetPagedFieldsResponse>} - An ApiResponse<GetPagedFieldsResponse>.
   */
  public asGetPagedFieldsResponseType(): ApiResponse<GetPagedFieldsResponse> {
    const apiResponse = this as ApiResponse<any>;

    const fields = apiResponse.data.items.map((item: any) =>
      ApiResponse.getFieldByType(item)
    );

    const getPagedFieldsResponse = new GetPagedFieldsResponse(
      fields,
      apiResponse.data.pageNumber,
      apiResponse.data.pageSize,
      apiResponse.data.totalPages,
      apiResponse.data.totalRecords
    );

    return new ApiResponse<GetPagedFieldsResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      getPagedFieldsResponse
    );
  }

  /**
   * @method asCreatedWithIdResponseType - Converts the ApiResponse to an ApiResponse<CreatedWithIdResponse>.
   * @returns {ApiResponse<CreatedWithIdResponse>} - An ApiResponse<CreatedWithIdResponse>.
   */
  public asCreatedWithIdResponseType(): ApiResponse<CreatedWithIdResponse> {
    const apiResponse = this as ApiResponse<any>;

    const createdWithIdResponse = new CreatedWithIdResponse(
      apiResponse.data.id
    );

    return new ApiResponse<CreatedWithIdResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      createdWithIdResponse
    );
  }

  public asFileInfoType(): ApiResponse<FileInfo> {
    const apiResponse = this as ApiResponse<any>;

    const fileInfo = new FileInfo(
      apiResponse.data.type,
      apiResponse.data.contentType,
      apiResponse.data.name,
      apiResponse.data.createdDate,
      apiResponse.data.modifiedDate,
      apiResponse.data.owner,
      apiResponse.data.notes,
      apiResponse.data.fileHref
    );

    return new ApiResponse<FileInfo>(
      apiResponse.statusCode,
      apiResponse.message,
      fileInfo
    );
  }

  public asFileType(response: AxiosResponse): ApiResponse<File> {
    const apiResponse = this as ApiResponse<any>;

    let fileName = response.headers['content-disposition']
      .split(';')[1]
      .split('=')[1];

    fileName = fileName.substring(1, fileName.length - 1);

    const contentType =
      response.headers['content-type'] ??
      response.headers['Content-Type'] ??
      null;

    let contentLength =
      response.headers['content-length'] ??
      response.headers['Content-Length'] ??
      0;

    contentLength = parseInt(contentLength);

    const file = new File(
      apiResponse.data,
      fileName,
      contentType,
      contentLength
    );

    return new ApiResponse<File>(
      apiResponse.statusCode,
      apiResponse.message,
      file
    );
  }

  /**
   * @method asListItemResponseType - Converts the ApiResponse to an ApiResponse<ListItemResponse>.
   * @returns {ApiResponse<ListItemResponse>} - An ApiResponse<ListItemResponse>.
   */
  public asListItemResponseType(): ApiResponse<ListItemResponse> {
    const apiResponse = this as ApiResponse<any>;

    const listItemResponse = new ListItemResponse(apiResponse.data.id);

    return new ApiResponse<ListItemResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      listItemResponse
    );
  }

  /**
   * @method asGetPagedReportsResponseType - Converts the ApiResponse to an ApiResponse<GetPagedReportsResponse>.
   * @returns {ApiResponse<GetPagedReportsResponse>} - An ApiResponse<GetPagedReportsResponse>.
   */
  public asGetPagedReportsResponseType(): ApiResponse<GetPagedReportsResponse> {
    const apiResponse = this as ApiResponse<any>;

    const reports = apiResponse.data.items.map((item: any) => {
      return new Report(item.id, item.appId, item.name, item.description);
    });

    const getPagedReportsResponse = new GetPagedReportsResponse(
      reports,
      apiResponse.data.pageNumber,
      apiResponse.data.pageSize,
      apiResponse.data.totalPages,
      apiResponse.data.totalRecords
    );

    return new ApiResponse<GetPagedReportsResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      getPagedReportsResponse
    );
  }

  asReportDataType(): ApiResponse<ReportData> {
    const apiResponse = this as ApiResponse<any>;

    const rows = apiResponse.data.rows.map((row) => {
      return new Row(row.recordId, row.cells);
    });

    const reportData = new ReportData(apiResponse.data.columns, rows);

    return new ApiResponse<ReportData>(
      apiResponse.statusCode,
      apiResponse.message,
      reportData
    );
  }

  /**
   * @method asFileCollectionType - Converts the field item to the appropriate field object based upon the field item's type.
   * @param {any} fieldItem - The field item to convert.
   * @returns {Field} - The converted field object.
   */
  private static getFieldByType(fieldItem: any): Field {
    const type = FieldType[fieldItem.type];
    const status = FieldStatus[fieldItem.status];

    switch (type) {
      case FieldType.Reference: {
        const multiplicity = Multiplicity[fieldItem.multiplicity];

        return new ReferenceField(
          fieldItem.id,
          fieldItem.appId,
          fieldItem.name,
          type,
          status,
          fieldItem.isRequired,
          fieldItem.isUnique,
          multiplicity,
          fieldItem.referencedAppId
        );
      }
      case FieldType.List: {
        const values = ApiResponse.getListValues(fieldItem);
        const multiplicity = Multiplicity[fieldItem.multiplicity];

        return new ListField(
          fieldItem.id,
          fieldItem.appId,
          fieldItem.name,
          type,
          status,
          fieldItem.isRequired,
          fieldItem.isUnique,
          multiplicity,
          fieldItem.listId,
          values
        );
      }
      case FieldType.Formula: {
        const values = ApiResponse.getListValues(fieldItem);
        const outputType = FormulaOutputType[fieldItem.outputType];

        return new FormulaField(
          fieldItem.id,
          fieldItem.appId,
          fieldItem.name,
          type,
          status,
          fieldItem.isRequired,
          fieldItem.isUnique,
          outputType,
          values
        );
      }
      default: {
        return new Field(
          fieldItem.id,
          fieldItem.appId,
          fieldItem.name,
          type,
          status,
          fieldItem.isRequired,
          fieldItem.isUnique
        );
      }
    }
  }

  /**
   * @method getListValues - Converts the field items list values to a ListValue[].
   * @param fieldItem - The field item whose values should be converted.
   * @returns {ListValue[]} - The converted list values.
   */
  private static getListValues(fieldItem: any): ListValue[] {
    return fieldItem.values.map((listValue: any) => {
      return new ListValue(
        listValue.id,
        listValue.name,
        listValue.sortOrder,
        listValue.numericValue,
        listValue.color
      );
    });
  }
}
