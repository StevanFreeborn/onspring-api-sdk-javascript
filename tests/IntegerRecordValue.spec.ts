import { IntegerRecordValue } from '../src/models/IntegerRecordValue';
import { expect } from 'chai';

describe('IntegerRecordValue', function () {
  it('should be defined', function () {
    expect(IntegerRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(IntegerRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(IntegerRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const integerRecordValue = new IntegerRecordValue(1, 1);
    expect(integerRecordValue).to.have.property('fieldId');
    expect(integerRecordValue).to.have.property('value');
    expect(integerRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const integerRecordValue = new IntegerRecordValue(1, 1);
    expect(integerRecordValue.fieldId).to.equal(1);
    expect(integerRecordValue.value).to.deep.equal(1);
    expect(integerRecordValue.type).to.equal('Integer');
  });
});
