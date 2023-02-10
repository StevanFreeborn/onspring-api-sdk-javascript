import { Record } from '../src/models/Record';
import { expect } from 'chai';
import { RecordValueType } from '../src/enums/RecordValueType';

describe('Record', function () {
  it('should be defined', function () {
    expect(Record).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Record).to.have.property('constructor');
  });

  it('should have a constructor that has 3 parameters', function () {
    expect(Record).to.have.lengthOf(3);
  });

  it('should have a constructor that sets its properties correctly', function () {
    const record = new Record(1, 2, [
      {
        type: RecordValueType.String,
        fieldId: 1,
        value: 'test',
      },
      {
        type: RecordValueType.String,
        fieldId: 2,
        value: 'test',
      },
    ]);
    expect(record).to.have.property('appId', 1);
    expect(record).to.have.property('recordId', 2);
    expect(record)
      .to.have.property('fieldData')
      .that.is.an('array')
      .with.lengthOf(2);
  });

  it('should have an appId property', function () {
    expect(
      new Record(1, 2, [
        {
          type: RecordValueType.String,
          fieldId: 1,
          value: 'test',
        },
        {
          type: RecordValueType.String,
          fieldId: 2,
          value: 'test',
        },
      ])
    ).to.have.property('appId');
  });

  it('should have a recordId property', function () {
    expect(
      new Record(1, 2, [
        {
          type: RecordValueType.String,
          fieldId: 1,
          value: 'test',
        },
        {
          type: RecordValueType.String,
          fieldId: 2,
          value: 'test',
        },
      ])
    ).to.have.property('recordId');
  });

  it('should have a fieldData property', function () {
    expect(
      new Record(1, 2, [
        {
          type: RecordValueType.String,
          fieldId: 1,
          value: 'test',
        },
        {
          type: RecordValueType.String,
          fieldId: 2,
          value: 'test',
        },
      ])
    ).to.have.property('fieldData');
  });
});
