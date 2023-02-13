import { DateRecordValue } from '../src/models/DateRecordValue';
import { expect } from 'chai';

describe('DateRecordValue', function () {
  it('should be defined', function () {
    expect(DateRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(DateRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(DateRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const dateRecordValue = new DateRecordValue(1, new Date());
    expect(dateRecordValue).to.have.property('fieldId');
    expect(dateRecordValue).to.have.property('value');
    expect(dateRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const date = new Date();
    const dateRecordValue = new DateRecordValue(1, date);
    expect(dateRecordValue.fieldId).to.equal(1);
    expect(dateRecordValue.value).to.deep.equal(date);
    expect(dateRecordValue.type).to.equal('Date');
  });
});
