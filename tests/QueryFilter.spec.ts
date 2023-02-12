import { QueryFilter } from '../src/models/QueryFilter';
import { expect } from 'chai';
import { FilterOperators } from '../src/enums/FilterOperators';

describe('QueryFilter', function () {
  it('should be defined', function () {
    expect(QueryFilter).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(QueryFilter).to.have.property('constructor');
  });

  it('should have a constructor that takes 3 parameters', function () {
    expect(QueryFilter).to.have.lengthOf(3);
  });

  it('should have a constructor that throws an error if value is null and operator is not IsNull or NotNull', function () {
    expect(() => new QueryFilter(1, FilterOperators.Equal, null)).to.throw(
      'Value cannot be null for this operator'
    );
  });

  it('should have a fieldId property', function () {
    expect(new QueryFilter(1, FilterOperators.Equal, 'test')).to.have.property(
      'fieldId'
    );
  });

  it('should have an operator property', function () {
    expect(new QueryFilter(1, FilterOperators.Equal, 'test')).to.have.property(
      'operator'
    );
  });

  it('should have a value property', function () {
    expect(new QueryFilter(1, FilterOperators.Equal, 'test')).to.have.property(
      'value'
    );
  });

  it('should have a constructor that sets its properties correctly', function () {
    const fieldId = 1;
    const operator = FilterOperators.Equal;
    const value = 'test';

    const filter = new QueryFilter(fieldId, operator, value);

    expect(filter).to.have.property('fieldId', fieldId);
    expect(filter).to.have.property('operator', operator);
    expect(filter).to.have.property('value', value);
  });

  describe('toString', function () {
    it('should be defined', function () {
      expect(QueryFilter.prototype.toString).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(QueryFilter.prototype.toString).to.be.a('function');
    });

    it('should return a string', function () {
      expect(
        new QueryFilter(1, FilterOperators.Equal, 'test').toString()
      ).to.be.a('string');
    });

    it('should return a properly constructed filter string if value is null', function () {
      expect(
        new QueryFilter(1, FilterOperators.IsNull, null).toString()
      ).to.equal('1 isnull');
    });

    it('should return a properly constructed filter string if value is a Date', function () {
      const date = new Date();
      expect(
        new QueryFilter(1, FilterOperators.Equal, date).toString()
      ).to.equal(`1 eq datetime'${date.toISOString()}'`);
    });

    it('should return a properly constructed filter string if value is a string', function () {
      expect(
        new QueryFilter(1, FilterOperators.Equal, 'test').toString()
      ).to.equal("1 eq 'test'");
    });

    it('should return a properly constructed filter string if value is a number', function () {
      expect(new QueryFilter(1, FilterOperators.Equal, 1).toString()).to.equal(
        '1 eq 1'
      );
    });
  });
});
