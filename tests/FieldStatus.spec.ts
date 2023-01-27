import { FieldStatus } from '../src/enums/FieldStatus';
import { expect } from 'chai';

describe('FieldStatus', function () {
  describe('Enabled', function () {
    it('should return the correct value', function () {
      const result = FieldStatus.Enabled;
      expect(result).to.equal('Enabled');
    });
  });

  describe('Disabled', function () {
    it('should return the correct value', function () {
      const result = FieldStatus.Disabled;
      expect(result).to.equal('Disabled');
    });
  });

  describe('Invalid', function () {
    it('should return the correct value', function () {
      const result = FieldStatus.Invalid;
      expect(result).to.equal('Invalid');
    });
  });
});