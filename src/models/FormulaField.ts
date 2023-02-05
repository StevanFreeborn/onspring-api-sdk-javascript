import { FormulaOutputType } from '../enums/FormulaOutputType';
import { Field } from './Field';
import { type ListValue } from './ListValue';

/**
 * @class FormulaField - Represents a formula field.
 */
export class FormulaField extends Field {
  /**
   * @property {FormulaOutputType} outputType - The output type of the formula.
   */
  public outputType: FormulaOutputType;

  /**
   * @property {ListValue[]} values - The list values of the formula.
   */
  public values: ListValue[];

  /**
   * @constructor - Creates a new FormulaField.
   * @param {number} id - The id of the formula field.
   * @param {number} appId - The id of the app the formula field belongs to.
   * @param {string} name - The name of the formula field.
   * @param {string} type - The type of the formula field.
   * @param {string} status - The status of the formula field.
   * @param {boolean} isRequired - Whether the formula field is required.
   * @param {boolean} isUnique - Whether the formula field is unique.
   * @param {string} outputType - The output type of the formula field.
   * @param {ListValue[]} values - The list values of the formula field.
   * @returns {FormulaField} - A new FormulaField.
   * @throws {Error} - Throws an error if the outputType is not a valid FormulaOutputType.
   */
  constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean,
    outputType: string,
    values: ListValue[]
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (FormulaOutputType[outputType] === undefined) {
      throw new Error(
        `The outputType ${outputType} is not a valid FormulaOutputType.`
      );
    }

    this.outputType = FormulaOutputType[outputType];
    this.values = values;
  }
}
