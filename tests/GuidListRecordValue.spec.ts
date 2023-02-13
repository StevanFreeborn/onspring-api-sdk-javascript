import { GuidListRecordValue } from '../src/models/GuidListRecordValue';
import { expect } from 'chai';

describe('GuidListRecordValue', function () {
  it('should be defined', function () {
    expect(GuidListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GuidListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(GuidListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const guidListRecordValue = new GuidListRecordValue(1, []);
    expect(guidListRecordValue).to.have.property('fieldId');
    expect(guidListRecordValue).to.have.property('value');
    expect(guidListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const guidListRecordValue = new GuidListRecordValue(1, []);
    expect(guidListRecordValue.fieldId).to.equal(1);
    expect(guidListRecordValue.value).to.deep.equal([]);
    expect(guidListRecordValue.type).to.equal('GuidList');
  });
});
