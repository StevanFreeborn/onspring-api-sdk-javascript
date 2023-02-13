import { StringListRecordValue } from '../src/models/StringListRecordValue';
import { expect } from 'chai';

describe('StringListRecordValue', function () {
  it('should be defined', function () {
    expect(StringListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(StringListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(StringListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const stringListRecordValue = new StringListRecordValue(1, []);
    expect(stringListRecordValue).to.have.property('fieldId');
    expect(stringListRecordValue).to.have.property('value');
    expect(stringListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const stringListRecordValue = new StringListRecordValue(1, []);
    expect(stringListRecordValue.fieldId).to.equal(1);
    expect(stringListRecordValue.value).to.deep.equal([]);
    expect(stringListRecordValue.type).to.equal('StringList');
  });
});
