import { DelegateListRecordValue } from '../src/models/DelegateListRecordValue';
import { expect } from 'chai';

describe('DelegateListRecordValue', function () {
  it('should be defined', function () {
    expect(DelegateListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(DelegateListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(DelegateListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const delegateListRecordValue = new DelegateListRecordValue(1, []);
    expect(delegateListRecordValue).to.have.property('fieldId');
    expect(delegateListRecordValue).to.have.property('value');
    expect(delegateListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const delegateListRecordValue = new DelegateListRecordValue(1, []);
    expect(delegateListRecordValue.fieldId).to.equal(1);
    expect(delegateListRecordValue.value).to.deep.equal([]);
    expect(delegateListRecordValue.type).to.equal('DelegateList');
  });
});
