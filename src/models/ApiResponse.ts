import { AxiosResponse } from 'axios';
import { DelegateType } from '../enums/DelegateType';
import { FieldStatus } from '../enums/FieldStatus';
import { FieldType } from '../enums/FieldType';
import { FileStorageSite } from '../enums/FileStorageSite';
import { FormulaOutputType } from '../enums/FormulaOutputType';
import { Multiplicity } from '../enums/Multiplicity';
import { RecordValueType } from '../enums/RecordValueType';
import { TimeSpanIncrement } from '../enums/TimeSpanIncrement';
import { TimeSpanRecurrenceType } from '../enums/TimeSpanRecurrenceType';
import { App } from './App';
import { Attachment } from './Attachment';
import { AttachmentListRecordValue } from './AttachmentListRecordValue';
import { CollectionResponse } from './CollectionResponse';
import { CreatedWithIdResponse } from './CreatedWithIdResponse';
import { DateRecordValue } from './DateRecordValue';
import { DecimalRecordValue } from './DecimalRecordValue';
import { Delegate } from './Delegate';
import { DelegateListRecordValue } from './DelegateListRecordValue';
import { Field } from './Field';
import { File } from './File';
import { FileInfo } from './FileInfo';
import { FileListRecordValue } from './FileListRecordValue';
import { FormulaField } from './FormulaField';
import { GetPagedAppsResponse } from './GetPagedAppsResponse';
import { GetPagedFieldsResponse } from './GetPagedFieldsResponse';
import { GetPagedRecordsResponse } from './GetPagedRecordsResponse';
import { GetPagedReportsResponse } from './GetPagedReportsResponse';
import { GuidListRecordValue } from './GuidListRecordValue';
import { GuidRecordValue } from './GuidRecordValue';
import { IntegerListRecordValue } from './IntegerListRecordValue';
import { IntegerRecordValue } from './IntegerRecordValue';
import { ListField } from './ListField';
import { ListItemResponse } from './ListItemResponse';
import { ListValue } from './ListValue';
import { Record } from './Record';
import { ReferenceField } from './ReferenceField';
import { Report } from './Report';
import { ReportData } from './ReportData';
import { Row } from './Row';
import { ScoringGroup } from './ScoringGroup';
import { ScoringGroupListRecordValue } from './ScoringGroupListRecordValue';
import { StringListRecordValue } from './StringListRecordValue';
import { StringRecordValue } from './StringRecordValue';
import { TimeSpanData } from './TimeSpanData';
import { TimeSpanRecordValue } from './TimeSpanRecordValue';
import { type RecordValue } from './RecordValue';
import { SaveRecordResponse } from './SaveRecordResponse';

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
   * @method asCreatedWithIdResponseType - Converts the ApiResponse to an ApiResponse<CreatedWithIdResponse<T>>.
   * @returns {ApiResponse<CreatedWithIdResponse<T>>} - An ApiResponse<CreatedWithIdResponse<T>>.
   */
  public asCreatedWithIdResponseType<T>(): ApiResponse<
    CreatedWithIdResponse<T>
  > {
    const apiResponse = this as ApiResponse<any>;

    const createdWithIdResponse = new CreatedWithIdResponse<T>(
      apiResponse.data.id
    );

    return new ApiResponse<CreatedWithIdResponse<T>>(
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

  /**
   * @method asReportDataType - Converts the ApiResponse to an ApiResponse<ReportData>.
   * @returns {ApiResponse<ReportData>} - An ApiResponse<ReportData>.
   */
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
   * @method asGetPagedRecordsResponseType - Converts the ApiResponse to an ApiResponse<GetPagedRecordsResponse>.
   * @returns {ApiResponse<GetPagedRecordsResponse>} - An ApiResponse<GetPagedRecordsResponse>.
   */
  public asGetPagedRecordsResponseType(): ApiResponse<GetPagedRecordsResponse> {
    const apiResponse = this as ApiResponse<any>;

    const records = apiResponse.data.items.map((item: any) => {
      const recordValues = item.fieldData.map((recordValueItem: any) =>
        ApiResponse.getRecordValueByType(recordValueItem)
      );

      return new Record(item.appId, item.recordId, recordValues);
    });

    const getPagedRecordsResponse = new GetPagedRecordsResponse(
      records,
      apiResponse.data.pageNumber,
      apiResponse.data.pageSize,
      apiResponse.data.totalPages,
      apiResponse.data.totalRecords
    );

    return new ApiResponse<GetPagedRecordsResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      getPagedRecordsResponse
    );
  }

  /**
   * @method asRecordType - Converts the ApiResponse to an ApiResponse<Record>.
   * @returns {ApiResponse<Record>} - An ApiResponse<Record>.
   */
  public asRecordType(): ApiResponse<Record> {
    const apiResponse = this as ApiResponse<any>;

    const recordValues = apiResponse.data.fieldData.map(
      (recordValueItem: any) =>
        ApiResponse.getRecordValueByType(recordValueItem)
    );

    const record = new Record(
      apiResponse.data.appId,
      apiResponse.data.recordId,
      recordValues
    );

    return new ApiResponse<Record>(
      apiResponse.statusCode,
      apiResponse.message,
      record
    );
  }

  public asRecordCollectionType(): ApiResponse<CollectionResponse<Record>> {
    const apiResponse = this as ApiResponse<any>;

    const records = apiResponse.data.items.map((item: any) => {
      const recordValues = item.fieldData.map((recordValueItem: any) =>
        ApiResponse.getRecordValueByType(recordValueItem)
      );

      return new Record(item.appId, item.recordId, recordValues);
    });

    const collectionResponse = new CollectionResponse<Record>(
      apiResponse.data.count,
      records
    );

    return new ApiResponse<CollectionResponse<Record>>(
      apiResponse.statusCode,
      apiResponse.message,
      collectionResponse
    );
  }

  public asSaveRecordResponseType(): ApiResponse<SaveRecordResponse> {
    const apiResponse = this as ApiResponse<any>;
    const response = new SaveRecordResponse(
      apiResponse.data.id,
      apiResponse.data.warnings
    );
    return new ApiResponse<SaveRecordResponse>(
      apiResponse.statusCode,
      apiResponse.message,
      response
    );
  }

  private static getRecordValueByType(recordValueItem: any): RecordValue<any> {
    const type = RecordValueType[recordValueItem.type];

    switch (type) {
      case RecordValueType.String: {
        return new StringRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.Integer: {
        return new IntegerRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.Decimal: {
        return new DecimalRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.Date: {
        const date = new Date(recordValueItem.value);
        return new DateRecordValue(recordValueItem.fieldId, date);
      }
      case RecordValueType.TimeSpan: {
        const timeSpan = ApiResponse.convertToTimeSpanData(
          recordValueItem.value
        );
        return new TimeSpanRecordValue(recordValueItem.fieldId, timeSpan);
      }
      case RecordValueType.Guid: {
        return new GuidRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.StringList: {
        return new StringListRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.IntegerList: {
        return new IntegerListRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.GuidList: {
        return new GuidListRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      case RecordValueType.AttachmentList: {
        const attachments = recordValueItem.value.map((attachmentItem: any) =>
          ApiResponse.convertToAttachment(attachmentItem)
        );

        return new AttachmentListRecordValue(
          recordValueItem.fieldId,
          attachments
        );
      }
      case RecordValueType.ScoringGroupList: {
        const array = recordValueItem.value as any[];
        const isDelegateList = array[0].delegateType !== undefined;

        if (isDelegateList) {
          const delegates = recordValueItem.value.map((delegateItem: any) =>
            ApiResponse.convertToDelegate(delegateItem)
          );

          return new DelegateListRecordValue(
            recordValueItem.fieldId,
            delegates
          );
        }

        const scoringGroups = recordValueItem.value.map(
          (scoringGroupItem: any) =>
            ApiResponse.convertToScoringGroup(scoringGroupItem)
        );

        return new ScoringGroupListRecordValue(
          recordValueItem.fieldId,
          scoringGroups
        );
      }
      case RecordValueType.FileList: {
        return new FileListRecordValue(
          recordValueItem.fieldId,
          recordValueItem.value
        );
      }
      default: {
        throw new Error(
          `Unknown record value type: ${recordValueItem.type as string}`
        );
      }
    }
  }

  /**
   * @method getFieldByType - Converts the field item to the appropriate field object based upon the field item's type.
   * @param {any} fieldItem - The field item to convert.
   * @returns {Field} - The converted field object.
   * @throws {Error} - If the field item's type is unknown.
   */
  private static getFieldByType(fieldItem: any): Field {
    const type = FieldType[fieldItem.type];
    const status = FieldStatus[fieldItem.status];

    if (type === undefined) {
      throw new Error(`Unknown field type: ${fieldItem.type as string}`);
    }

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

  private static convertToDelegate(delegateItem: any): Delegate {
    const delegateType = DelegateType[delegateItem.delegateType];

    if (delegateType === undefined) {
      throw new Error(
        `${delegateItem.delegateType as string} is not a valid DelegateType.`
      );
    }

    const delegationDateTime = new Date(delegateItem.delegationDateTime);

    const hasName =
      delegateItem.name !== null && delegateItem.name !== undefined;
    const name = hasName ? delegateItem.name : null;

    const hasCompletionDate =
      delegateItem.delegationCompletedDateTime !== null &&
      delegateItem.delegationCompletedDateTime !== undefined;

    const delegationCompletedDateTime = hasCompletionDate
      ? new Date(delegateItem.delegationCompletedDateTime)
      : null;

    return new Delegate(
      delegateItem.delegateType,
      name,
      delegateItem.emailAddress,
      delegationDateTime,
      delegationCompletedDateTime
    );
  }

  /**
   * @method convertToScoringGroup - Converts the scoring group item to the appropriate scoring group object.
   * @param {any} scoringGroupItem - The scoring group item to convert.
   * @returns {ScoringGroup} - The converted scoring group object.
   */
  private static convertToScoringGroup(scoringGroupItem: any): ScoringGroup {
    return new ScoringGroup(
      scoringGroupItem.id,
      scoringGroupItem.name,
      scoringGroupItem.score,
      scoringGroupItem.maximumScore
    );
  }

  /**
   * @method convertToAttachment - Converts the attachment item to the appropriate attachment object.
   * @param {any} attachmentItem - The attachment item to convert.
   * @returns {Attachment} - The converted attachment object.
   */
  private static convertToAttachment(attachmentItem: any): Attachment {
    const storageLocation = FileStorageSite[attachmentItem.storageLocation];

    if (storageLocation === undefined) {
      throw new Error(
        `${
          attachmentItem.storageLocation as string
        } is not a valid FileStorageSite.`
      );
    }

    const hasNotes =
      attachmentItem.notes !== null && attachmentItem.notes !== undefined;

    const notes = hasNotes ? attachmentItem.notes : null;

    return new Attachment(
      attachmentItem.fileId,
      attachmentItem.fileName,
      notes,
      storageLocation
    );
  }

  /**
   * @method convertToTimeSpanData - Converts the time span item to the appropriate time span data object.
   * @param {any} timeSpanItem - The time span item to convert.
   * @returns {TimeSpanData} - The converted time span data object.
   */
  private static convertToTimeSpanData(timeSpanItem: any): TimeSpanData {
    const increment = TimeSpanIncrement[timeSpanItem.increment];

    const hasRecurrence =
      timeSpanItem.recurrence !== null && timeSpanItem.recurrence !== undefined;

    const recurrene = hasRecurrence
      ? TimeSpanRecurrenceType[timeSpanItem.recurrence]
      : null;

    const hasEndAfterOccurrences =
      timeSpanItem.endAfterOccurrences !== null &&
      timeSpanItem.endAfterOccurrences !== undefined;

    const endAfterOccurrences = hasEndAfterOccurrences
      ? timeSpanItem.endAfterOccurrences
      : null;

    const hasEndByDate =
      timeSpanItem.endByDate !== null && timeSpanItem.endByDate !== undefined;

    const endByDate = hasEndByDate ? new Date(timeSpanItem.endByDate) : null;

    if (increment === undefined) {
      throw new Error(
        `${timeSpanItem.increment as string} is not a valid TimeSpanIncrement.`
      );
    }

    if (recurrene === undefined) {
      throw new Error(
        `${
          timeSpanItem.recurrence as string
        } is not a valid TimeSpanRecurrenceType.`
      );
    }

    return new TimeSpanData(
      timeSpanItem.quantity,
      increment,
      recurrene,
      endAfterOccurrences,
      endByDate
    );
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
