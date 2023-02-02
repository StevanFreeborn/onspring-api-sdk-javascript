import { TimeSpanRecurrenceType } from '../src/enums/TimeSpanRecurrenceType';
import { expect } from 'chai';

describe('TimeSpanRecurrenceType', function () {
  describe('None', function () {
    it('should return the correct value', function () {
      const result = TimeSpanRecurrenceType.None;
      expect(result).to.equal('None');
    });
  });

  describe('EndByDate', function () {
    it('should return the correct value', function () {
      const result = TimeSpanRecurrenceType.EndByDate;
      expect(result).to.equal('EndByDate');
    });
  });

  describe('EndAfterOccurrences', function () {
    it('should return the correct value', function () {
      const result = TimeSpanRecurrenceType.EndAfterOccurrences;
      expect(result).to.equal('EndAfterOccurrences');
    });
  });
});
