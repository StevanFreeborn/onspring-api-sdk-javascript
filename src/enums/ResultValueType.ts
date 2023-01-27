/**
 * @enum ResultValueType - The type of the result value.
 */
export enum ResultValueType {
  /**
   * @constant String - The result value is a string.
   * @type {string}
   */
  String = 'String',

  /**
   * @constant Integer - The result value is an integer.
   * @type {string}
   */
  Integer = 'Integer',
  
  /**
   * @constant Decimal - The result value is a decimal.
   * @type {string}
   */
  Decimal = 'Decimal',

  /**
   * @constant Date - The result value is a Date.
   * @type {string}
   */
  Date = 'Date',

  /**
   * @constant TimeSpan - The result value is a TimeSpan.
   * @type {string}
   */
  TimeSpan = 'TimeSpan',

  /**
   * @constant Guid - The result value is a Guid.
   */
  Guid = 'Guid',

  /**
   * @constant StringList - The result value is a list of strings.
   * @type {string}
   */
  StringList = 'StringList',

  /**
   * @constant IntegerList - The result value is a list of integers.
   * @type {string}
   */
  IntegerList = 'IntegerList',

  /**
   * @constant GuidList - The result value is a list of Guids.
   * @type {string}
   */
  GuidList = 'GuidList',

  /**
   * @constant AttachmentList - The result value is a list of attachments.
   * @type {string}
   */
  AttachmentList = 'AttachmentList',

  /**
   * @constant ScoringGroupList - The result value is a list of scoring groups.
   * @type {string}
   */
  ScoringGroupList = 'ScoringGroupList',

  /**
   * @constant FileList - The result value is a list of files.
   * @type {string}
   */
  FileList = 'FileList',
}
