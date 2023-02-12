/**
 * @enum FilterOperators - The operators that can be used in a query filter
 */
export enum FilterOperators {
  /**
   * @constant Equal - The equal operator
   * @remarks Can be used with text, auto-number, date, and number fields as well as their formula equivalents.
   */
  Equal = 'eq',

  /**
   * @constant NotEqual - The not equal operator
   * @remarks Can be used with text, auto-number, date, and number fields as well as their formula equivalents.
   */
  NotEqual = 'ne',

  /**
   * @constant Contains - The contains operator
   * @remarks Can be used with list fields as well as their formula equivalents.
   */
  Contains = 'contains',

  /**
   * @constant IsNull - The is null operator
   * @remarks Can be used with text, date, and number fields as well as their formula equivalents.
   */
  IsNull = 'isnull',

  /**
   * @constant NotNull - The not null operator
   * @remarks Can be used with text, date, and number fields as well as their formula equivalents.
   */
  NotNull = 'notnull',

  /**
   * @constant GreaterThan - The greater than operator
   * @remarks Can be used with auto-number, date, and number fields as well as their formula equivalents.
   */
  GreaterThan = 'gt',

  /**
   * @constant LessThan - The less than operator
   * @remarks Can be used with auto-number, date, and number fields as well as their formula equivalents.
   */
  LessThan = 'lt',

  /**
   * @constant And - The and operator
   * @remarks Can be used to create compound filters.
   */
  And = 'and',

  /**
   * @constant Or - The or operator
   * @remarks Can be used to create compound filters.
   */
  Or = 'or',

  /**
   * @constant Not - The not operator
   * @remarks Can be used to negate a filter and create compound filters.
   */
  Not = 'not',
}
