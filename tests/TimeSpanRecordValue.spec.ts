import { TimeSpanRecordValue } from '../src/models/TimeSpanRecordValue';
import { expect } from 'chai';
import { TimeSpanData } from '../src/models/TimeSpanData';
import { TimeSpanIncrement } from '../src/enums/TimeSpanIncrement';
import { TimeSpanRecurrenceType } from '../src/enums/TimeSpanRecurrenceType';

describe('TimeSpanRecordValue', function () {
  it('should be defined', function () {
    expect(TimeSpanRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(TimeSpanRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(TimeSpanRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const timeSpanData = new TimeSpanData(
      1,
      TimeSpanIncrement.Days,
      TimeSpanRecurrenceType.None,
      null,
      null
    );
    const timeSpanRecordValue = new TimeSpanRecordValue(1, timeSpanData);
    expect(timeSpanRecordValue).to.have.property('fieldId');
    expect(timeSpanRecordValue).to.have.property('value');
    expect(timeSpanRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const timeSpanData = new TimeSpanData(
      1,
      TimeSpanIncrement.Days,
      TimeSpanRecurrenceType.None,
      null,
      null
    );
    const timeSpanRecordValue = new TimeSpanRecordValue(1, timeSpanData);

    expect(timeSpanRecordValue.fieldId).to.equal(1);
    expect(timeSpanRecordValue.value).to.deep.equal(timeSpanData);
    expect(timeSpanRecordValue.type).to.equal('TimeSpan');
  });
});
