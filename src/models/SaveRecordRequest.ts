export class SaveRecordRequest {
  /**
   * @property {number} appId - The id of the app that the record belongs to.
   */
  public appId: number;

  /**
   * @property {number} recordId - The id of the record.
   * @remarks If the record id is not provided a new record will be created. Otherwise, the existing record will be updated.
   */
  public recordId: number | null;

  /**
   * @property {Map<number, any>} fields - The data for the fields in the record.
   * @remarks The key is the field id and the value is the value for the field.
   */
  public fields: Map<number, any>;

  constructor(
    appId: number,
    recordId: number | null = null,
    fields: Map<number, any> = new Map<number, any>()
  ) {
    this.appId = appId;
    this.recordId = recordId;
    this.fields = fields;
  }
}
