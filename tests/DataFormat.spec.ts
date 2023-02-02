import { DataFormat } from '../src/enums/DataFormat';
import { expect } from 'chai';

describe('DataFormat', function () {
  describe('Raw', function () {
    it('should return the correct value', function () {
      const result = DataFormat.Raw;
      expect(result).to.equal('Raw');
    });
  });

  describe('Formatted', function () {
    it('should return the correct value', function () {
      const result = DataFormat.Formatted;
      expect(result).to.equal('Formatted');
    });
  });
});
