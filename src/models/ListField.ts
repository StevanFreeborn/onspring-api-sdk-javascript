import { Multiplicity } from '../enums/Multiplicity';
import { Field } from './Field';
import { type ListValue } from './ListValue';

/**
 * @class ListField - Represents a list field.
 */
export class ListField extends Field {
  /**
   * @property {Multiplicity} multiplicity - The multiplicity of the list field.
   */
  public multiplicity: Multiplicity;

  /**
   * @property {number} listId - The id of the list the list field belongs to.
   */
  public listId: number;

  /**
   * @property {ListValue[]} values - The list values of the list field.
   */
  public values: ListValue[];

  /**
   * @constructor - Creates a new ListField.
   * @param {number} id - The id of the list field.
   * @param {number} appId - The id of the app the list field belongs to.
   * @param {string} name - The name of the list field.
   * @param {string} type - The type of the list field.
   * @param {string} status - The status of the list field.
   * @param {boolean} isRequired - Whether the list field is required.
   * @param {boolean} isUnique - Whether the list field is unique.
   * @param {string} multiplicity - The multiplicity of the list field.
   * @param {number} listId - The id of the list the list field belongs to.
   * @param {ListValue[]} values - The list values of the list field.
   * @returns {ListField} - A new ListField.
   * @throws {Error} - Throws an error if the multiplicity is not a valid Multiplicity.
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
    listId: number,
    values: ListValue[]
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (Multiplicity[multiplicity] === undefined) {
      throw new Error(
        `The multiplicity ${multiplicity} is not a valid Multiplicity.`
      );
    }

    this.multiplicity = Multiplicity[multiplicity];
    this.listId = listId;
    this.values = values;
  }
}
