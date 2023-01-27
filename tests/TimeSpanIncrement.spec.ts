import { TimeSpanIncrement } from '../src/enums/TimeSpanIncrement';
import { expect } from 'chai';

describe('TimeSpanIncrement', function () {
  describe('Seconds', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Seconds;
      expect(result).to.equal('Seconds');
    });
  });

  describe('Minutes', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Minutes;
      expect(result).to.equal('Minutes');
    });
  });

  describe('Hours', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Hours;
      expect(result).to.equal('Hours');
    });
  });

  describe('Days', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Days;
      expect(result).to.equal('Days');
    });
  });

  describe('Weeks', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Weeks;
      expect(result).to.equal('Weeks');
    });
  });

  describe('Months', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Months;
      expect(result).to.equal('Months');
    });
  });

  describe('Years', function () {
    it('should return the correct value', function () {
      const result = TimeSpanIncrement.Years;
      expect(result).to.equal('Years');
    });
  });
});