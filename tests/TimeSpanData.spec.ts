import { TimeSpanData } from '../src/models/TimeSpanData';
import { expect } from 'chai';
import { TimeSpanIncrement } from '../src/enums/TimeSpanIncrement';
import { TimeSpanRecurrenceType } from '../src/enums/TimeSpanRecurrenceType';

describe('TimeSpanData', function () {
  it('should be defined', function () {
    expect(TimeSpanData).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(TimeSpanData).to.have.property('constructor');
  });

  it('should have a constructor that takes 5 parameters', function () {
    expect(TimeSpanData).to.have.lengthOf(5);
  });

  it('should have a quantity property', function () {
    expect(
      new TimeSpanData(
        1,
        TimeSpanIncrement.Days,
        TimeSpanRecurrenceType.None,
        1,
        new Date()
      )
    ).to.have.property('quantity');
  });

  it('should have an increment property', function () {
    expect(
      new TimeSpanData(
        1,
        TimeSpanIncrement.Days,
        TimeSpanRecurrenceType.None,
        1,
        new Date()
      )
    ).to.have.property('increment');
  });

  it('should have a recurrence property', function () {
    expect(
      new TimeSpanData(
        1,
        TimeSpanIncrement.Days,
        TimeSpanRecurrenceType.None,
        1,
        new Date()
      )
    ).to.have.property('recurrence');
  });

  it('should have an endAfterOccurrences property', function () {
    expect(
      new TimeSpanData(
        1,
        TimeSpanIncrement.Days,
        TimeSpanRecurrenceType.None,
        1,
        new Date()
      )
    ).to.have.property('endAfterOccurrences');
  });

  it('should have an endByDate property', function () {
    expect(
      new TimeSpanData(
        1,
        TimeSpanIncrement.Days,
        TimeSpanRecurrenceType.None,
        1,
        new Date()
      )
    ).to.have.property('endByDate');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const quantity = 1;
    const increment = TimeSpanIncrement.Days;
    const recurrence = TimeSpanRecurrenceType.None;
    const endAfterOccurrences = 1;
    const endByDate = new Date();

    const timeSpanData = new TimeSpanData(
      quantity,
      increment,
      recurrence,
      endAfterOccurrences,
      endByDate
    );
    expect(timeSpanData).to.have.property('quantity', quantity);
    expect(timeSpanData).to.have.property('increment', increment);
    expect(timeSpanData).to.have.property('recurrence', recurrence);
    expect(timeSpanData).to.have.property(
      'endAfterOccurrences',
      endAfterOccurrences
    );
    expect(timeSpanData).to.have.property('endByDate', endByDate);
  });
});
