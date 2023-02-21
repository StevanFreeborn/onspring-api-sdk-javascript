import { type FieldStatus } from '../enums/FieldStatus.js';
import { type FieldType } from '../enums/FieldType.js';
import { type Multiplicity } from '../enums/Multiplicity.js';
import { Field } from './Field.js';

/**
 * @class ReferenceField - Represents a reference field.
 */
export class ReferenceField extends Field {
  /**
   * @property {Multiplicity} multiplicity - The multiplicity of the reference field.
   */
  public multiplicity: Multiplicity;

  /**
   * @property {number} referencedAppId - The id of the app the reference field references.
   */
  public referencedAppId: number;

  /**
   * @constructor - Creates a new ReferenceField.
   * @param {number} id - The id of the reference field.
   * @param {number} appId - The id of the app the reference field belongs to.
   * @param {string} name - The name of the reference field.
   * @param {FieldType} type - The type of the reference field.
   * @param {FieldStatus} status - The status of the reference field.
   * @param {boolean} isRequired - Whether the reference field is required.
   * @param {boolean} isUnique - Whether the reference field is unique.
   * @param {Multiplicity} multiplicity - The multiplicity of the reference field.
   * @param {number} referencedAppId - The id of the app the reference field references.
   * @returns {ReferenceField} - A new ReferenceField.
   */
  constructor(
    id: number,
    appId: number,
    name: string,
    type: FieldType,
    status: FieldStatus,
    isRequired: boolean,
    isUnique: boolean,
    multiplicity: Multiplicity,
    referencedAppId: number
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);
    this.multiplicity = multiplicity;
    this.referencedAppId = referencedAppId;
  }
}
