/**
 * @enum RecordValueType - The type of the record value.
 */
export enum RecordValueType {
  /**
   * @constant String - The record value is a string.
   * @type {string}
   */
  String = 'String',

  /**
   * @constant Integer - The record value is an integer.
   * @type {string}
   */
  Integer = 'Integer',

  /**
   * @constant Decimal - The record value is a decimal.
   * @type {string}
   */
  Decimal = 'Decimal',

  /**
   * @constant Date - The record value is a Date.
   * @type {string}
   */
  Date = 'Date',

  /**
   * @constant TimeSpan - The record value is a TimeSpan.
   * @type {string}
   */
  TimeSpan = 'TimeSpan',

  /**
   * @constant Guid - The record value is a Guid.
   */
  Guid = 'Guid',

  /**
   * @constant StringList - The record value is a list of strings.
   * @type {string}
   */
  StringList = 'StringList',

  /**
   * @constant IntegerList - The record value is a list of integers.
   * @type {string}
   */
  IntegerList = 'IntegerList',

  /**
   * @constant GuidList - The record value is a list of Guids.
   * @type {string}
   */
  GuidList = 'GuidList',

  /**
   * @constant AttachmentList - The record value is a list of attachments.
   * @type {string}
   */
  AttachmentList = 'AttachmentList',

  /**
   * @constant ScoringGroupList - The record value is a list of scoring groups.
   * @type {string}
   */
  ScoringGroupList = 'ScoringGroupList',

  /**
   * @constant FileList - The record value is a list of files.
   * @type {string}
   */
  FileList = 'FileList',
}
