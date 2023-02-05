/**
 * @enum FieldType - The type of field.
 */
export enum FieldType {
  /**
   * @constant Text - The field is a text field.
   * @type {string}
   */
  Text = 'Text',

  /**
   * @constant Number - The field is a number field.
   * @type {string}
   */
  Number = 'Number',

  /**
   * @constant AutoNumber - The field is a autonumber field.
   * @type {string}
   */
  AutoNumber = 'AutoNumber',

  /**
   * @constant Date - The field is a date field.
   * @type {string}
   */
  Date = 'Date',

  /**
   * @constant TimeSpan - The field is a timespan field.
   * @type {string}
   */
  TimeSpan = 'TimeSpan',

  /**
   * @constant List - The field is a list field.
   * @type {string}
   */
  List = 'List',

  /**
   * @constant Reference - The field is a reference field.
   * @type {string}
   */
  Reference = 'Reference',

  /**
   * @constant SurveyReference - The field is a survey reference field.
   * @type {string}
   */
  SurveyReference = 'SurveyReference',

  /**
   * @constant SurveyGroupScoring - The field is a survey group scoring field.
   * @type {string}
   */
  SurveyGroupScoring = 'SurveyGroupScoring',

  /**
   * @constant SurveyCampaign - The field is a survey campaign field.
   * @type {string}
   */
  SurveyCampaign = 'SurveyCampaign',

  /**
   * @constant SurveyUnifiedAnswer - The field is a survey unified answer field.
   * @type {string}
   */
  SurveyUnifiedAnswer = 'SurveyUnifiedAnswer',

  /**
   * @constant SurveyDelegation - The field is a survey delegation field.
   */
  SurveyDelegation = 'SurveyDelegation',

  /**
   * @constant Attachment - The field is a attachment field.
   * @type {string}
   */
  Attachment = 'Attachment',

  /**
   * @constant Image - The field is a image field.
   * @type {string}
   */
  Image = 'Image',

  /**
   * @constant Formula - The field is a formula field.
   * @type {string}
   */
  Formula = 'Formula',
}
