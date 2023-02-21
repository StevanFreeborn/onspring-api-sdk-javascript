import { type FieldStatus } from '../enums/FieldStatus.js';
import { type FieldType } from '../enums/FieldType.js';
import { type FormulaOutputType } from '../enums/FormulaOutputType.js';
import { Field } from './Field.js';
import { type ListValue } from './ListValue.js';

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
   * @param {FieldType} type - The type of the formula field.
   * @param {FieldStatus} status - The status of the formula field.
   * @param {boolean} isRequired - Whether the formula field is required.
   * @param {boolean} isUnique - Whether the formula field is unique.
   * @param {FormulaOutputType} outputType - The output type of the formula field.
   * @param {ListValue[]} values - The list values of the formula field.
   * @returns {FormulaField} - A new FormulaField.
   */
  constructor(
    id: number,
    appId: number,
    name: string,
    type: FieldType,
    status: FieldStatus,
    isRequired: boolean,
    isUnique: boolean,
    outputType: FormulaOutputType,
    values: ListValue[]
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);
    this.outputType = outputType;
    this.values = values;
  }
}
