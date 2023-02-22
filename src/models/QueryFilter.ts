import { FilterOperators } from '../enums/FilterOperators.js';

/**
 * @class QueryFilter - Represents a query filter.
 */
export class QueryFilter {
  /**
   * @property {number} fieldId - The id of the field to filter on.
   */
  public fieldId: number;

  /**
   * @property {FilterOperators} operator - The operator for the filter.
   */
  public operator: FilterOperators;

  /**
   * @property {string | number | Date | null} value - The value for the filter.
   */
  public value: string | number | Date | null;

  /**
   * @constructor - Creates a new instance of the QueryFilter class.
   * @param {number} fieldId - The id of the field to filter on.
   * @param {FilterOperators} operator - The operator for the filter.
   * @param {string | number | Date | null} value - The value for the filter.
   * @returns {QueryFilter} - A new instance of the QueryFilter class.
   * @throws {Error} - If the value is null and the operator is not IsNull or NotNull.
   */
  constructor(
    fieldId: number,
    operator: FilterOperators,
    value: string | number | Date | null
  ) {
    if (
      value === null &&
      operator !== FilterOperators.IsNull &&
      operator !== FilterOperators.NotNull
    ) {
      throw new Error('Value cannot be null for this operator');
    }

    this.fieldId = fieldId;
    this.operator = operator;
    this.value = value;
  }

  /**
   * @method toString - Converts the filter to a string.
   * @returns {string} - The filter as a string.
   */
  public toString(): string {
    if (this.value == null) {
      return `${this.fieldId} ${this.operator}`;
    }

    if (this.value instanceof Date) {
      return `${this.fieldId} ${
        this.operator
      } datetime'${this.value.toISOString()}'`;
    }

    if (typeof this.value === 'string') {
      return `${this.fieldId} ${this.operator} '${this.value}'`;
    }

    return `${this.fieldId} ${this.operator} ${this.value}`;
  }
}
