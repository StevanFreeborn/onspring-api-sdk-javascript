import { ScoringGroupListRecordValue } from '../src/models/ScoringGroupListRecordValue';
import { expect } from 'chai';

describe('ScoringGroupListRecordValue', function () {
  it('should be defined', function () {
    expect(ScoringGroupListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(ScoringGroupListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(ScoringGroupListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const scoringGroupListRecordValue = new ScoringGroupListRecordValue(1, []);
    expect(scoringGroupListRecordValue).to.have.property('fieldId');
    expect(scoringGroupListRecordValue).to.have.property('value');
    expect(scoringGroupListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const scoringGroupListRecordValue = new ScoringGroupListRecordValue(1, []);
    expect(scoringGroupListRecordValue.fieldId).to.equal(1);
    expect(scoringGroupListRecordValue.value).to.deep.equal([]);
    expect(scoringGroupListRecordValue.type).to.equal('ScoringGroupList');
  });
});
