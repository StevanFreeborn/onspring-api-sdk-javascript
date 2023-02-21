import { FilterOperators } from '../enums/FilterOperators.js';

export class QueryFilter {
  public fieldId: number;
  public operator: FilterOperators;
  public value: string | number | Date | null;

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
