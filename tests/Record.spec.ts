import { Record } from '../src/models/Record';
import { expect } from 'chai';
import { RecordValueType } from '../src/enums/RecordValueType';
import { RecordValue } from '../src/models/RecordValue';

describe('Record', function () {
  it('should be defined', function () {
    expect(Record).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Record).to.have.property('constructor');
  });

  it('should have a constructor that has 2 parameters', function () {
    expect(Record).to.have.lengthOf(2);
  });

  it('should have a constructor that sets its properties correctly', function () {
    const record = new Record(1, 2, [
      new RecordValue(RecordValueType.String, 1, 'test'),
      new RecordValue(RecordValueType.String, 2, 'test'),
    ]);
    expect(record).to.have.property('appId', 1);
    expect(record).to.have.property('recordId', 2);
    expect(record)
      .to.have.property('fieldData')
      .that.is.an('array')
      .with.lengthOf(2);
  });

  it('should have a constructor that sets its properties correctly when no fieldData is provided', function () {
    const record = new Record(1, 2);
    expect(record).to.have.property('appId', 1);
    expect(record).to.have.property('recordId', 2);
    expect(record)
      .to.have.property('fieldData')
      .that.is.an('array')
      .with.lengthOf(0);
  });

  it('should have an appId property', function () {
    expect(
      new Record(1, 2, [
        new RecordValue(RecordValueType.String, 1, 'test'),
        new RecordValue(RecordValueType.String, 2, 'test'),
      ])
    ).to.have.property('appId');
  });

  it('should have a recordId property', function () {
    expect(
      new Record(1, 2, [
        new RecordValue(RecordValueType.String, 1, 'test'),
        new RecordValue(RecordValueType.String, 2, 'test'),
      ])
    ).to.have.property('recordId');
  });

  it('should have a fieldData property', function () {
    expect(
      new Record(1, 2, [
        new RecordValue(RecordValueType.String, 1, 'test'),
        new RecordValue(RecordValueType.String, 2, 'test'),
      ])
    ).to.have.property('fieldData');
  });
});
