import { IntegerListRecordValue } from '../src/models/IntegerListRecordValue';
import { expect } from 'chai';

describe('IntegerListRecordValue', function () {
  it('should be defined', function () {
    expect(IntegerListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(IntegerListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(IntegerListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const integerListRecordValue = new IntegerListRecordValue(1, []);
    expect(integerListRecordValue).to.have.property('fieldId');
    expect(integerListRecordValue).to.have.property('value');
    expect(integerListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const integerListRecordValue = new IntegerListRecordValue(1, []);
    expect(integerListRecordValue.fieldId).to.equal(1);
    expect(integerListRecordValue.value).to.deep.equal([]);
    expect(integerListRecordValue.type).to.equal('IntegerList');
  });
});
