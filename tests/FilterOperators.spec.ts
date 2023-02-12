import { FilterOperators } from '../src/enums/FilterOperators';
import { expect } from 'chai';

describe('FilterOperators', function () {
  it('should be defined', function () {
    expect(FilterOperators).to.not.be.undefined;
  });

  it('should have a Equal property with value "eq"', function () {
    expect(FilterOperators).to.have.property('Equal', 'eq');
  });

  it('should have a NotEqual property with value "ne"', function () {
    expect(FilterOperators).to.have.property('NotEqual', 'ne');
  });

  it('should have a Contains property with value "contains"', function () {
    expect(FilterOperators).to.have.property('Contains', 'contains');
  });

  it('should have a IsNull property with value "isnull"', function () {
    expect(FilterOperators).to.have.property('IsNull', 'isnull');
  });

  it('should have a NotNull property with value "notnull"', function () {
    expect(FilterOperators).to.have.property('NotNull', 'notnull');
  });

  it('should have a GreaterThan property with value "gt"', function () {
    expect(FilterOperators).to.have.property('GreaterThan', 'gt');
  });

  it('should have a LessThan property with value "lt"', function () {
    expect(FilterOperators).to.have.property('LessThan', 'lt');
  });

  it('should have a And property with value "and"', function () {
    expect(FilterOperators).to.have.property('And', 'and');
  });

  it('should have a Or property with value "or"', function () {
    expect(FilterOperators).to.have.property('Or', 'or');
  });

  it('should have a Not property with value "not"', function () {
    expect(FilterOperators).to.have.property('Not', 'not');
  });
});
