import { GuidRecordValue } from '../src/models/GuidRecordValue';
import { expect } from 'chai';

describe('GuidRecordValue', function () {
  it('should be defined', function () {
    expect(GuidRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GuidRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(GuidRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const guidRecordValue = new GuidRecordValue(1, 'test');
    expect(guidRecordValue).to.have.property('fieldId');
    expect(guidRecordValue).to.have.property('value');
    expect(guidRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const guidRecordValue = new GuidRecordValue(1, 'test');
    expect(guidRecordValue.fieldId).to.equal(1);
    expect(guidRecordValue.value).to.deep.equal('test');
    expect(guidRecordValue.type).to.equal('Guid');
  });
});
