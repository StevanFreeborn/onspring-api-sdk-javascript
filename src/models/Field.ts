import { type FieldStatus } from '../enums/FieldStatus.js';
import { type FieldType } from '../enums/FieldType.js';

/**
 * @class Field - Represents a Field.
 */
export class Field {
  /**
   * @property {number} id - The id of the Field.
   */
  public id: number;

  /**
   * @property {number} appId - The id of the App that the Field belongs to.
   */
  public appId: number;

  /**
   * @property {number} name - The name of the Field.
   */
  public name: string;

  /**
   * @property {FieldType} type - The type of the Field.
   */
  public type: FieldType;

  /**
   * @property {FieldStatus} status - The status of the Field.
   */
  public status: FieldStatus;

  /**
   * @property {boolean} isRequired - Indicates whether or not the Field is required.
   */
  public isRequired: boolean;

  /**
   * @property {boolean} isUnique - Indicates whether or not the Field is required to be unique.
   */
  public isUnique: boolean;

  /**
   * @constructor - Creates a new Field.
   * @param {number} id - The id of the Field.
   * @param {number} appId - The id of the App that the Field belongs to.
   * @param {string} name - The name of the Field.
   * @param {FieldType} type - The type of the Field.
   * @param {FieldStatus} status - The status of the Field.
   * @param {boolean} isRequired - Indicates whether or not the Field is required.
   * @param {boolean} isUnique - Indicates whether or not the Field is required to be unique.
   * @returns {Field} - A new Field.
   */
  public constructor(
    id: number,
    appId: number,
    name: string,
    type: FieldType,
    status: FieldStatus,
    isRequired: boolean,
    isUnique: boolean
  ) {
    this.id = id;
    this.appId = appId;
    this.name = name;
    this.type = type;
    this.status = status;
    this.isRequired = isRequired;
    this.isUnique = isUnique;
  }
}
