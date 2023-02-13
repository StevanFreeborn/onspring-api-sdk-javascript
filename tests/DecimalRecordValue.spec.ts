import { DecimalRecordValue } from '../src/models/DecimalRecordValue';
import { expect } from 'chai';

describe('DecimalRecordValue', function () {
  it('should be defined', function () {
    expect(DecimalRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(DecimalRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(DecimalRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const decimalRecordValue = new DecimalRecordValue(1, 1);
    expect(decimalRecordValue).to.have.property('fieldId');
    expect(decimalRecordValue).to.have.property('value');
    expect(decimalRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const decimalRecordValue = new DecimalRecordValue(1, 1);
    expect(decimalRecordValue.fieldId).to.equal(1);
    expect(decimalRecordValue.value).to.deep.equal(1);
    expect(decimalRecordValue.type).to.equal('Decimal');
  });
});
