import { Multiplicity } from '../enums/Multiplicity';
import { Field } from './Field';

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
   * @param {string} type - The type of the reference field.
   * @param {string} status - The status of the reference field.
   * @param {boolean} isRequired - Whether the reference field is required.
   * @param {boolean} isUnique - Whether the reference field is unique.
   * @param {string} multiplicity - The multiplicity of the reference field.
   * @param {number} referencedAppId - The id of the app the reference field references.
   * @returns {ReferenceField} - A new ReferenceField.
   * @throws {Error} - Throws an error if the multiplicity is not a valid Multiplicity.jjkdleroritlasaxmvjd
   */
  constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean,
    multiplicity: string,
    referencedAppId: number
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (Multiplicity[multiplicity] === undefined) {
      throw new Error(
        `The multiplicity ${multiplicity} is not a valid Multiplicity.`
      );
    }

    this.multiplicity = Multiplicity[multiplicity];
    this.referencedAppId = referencedAppId;
  }
}
