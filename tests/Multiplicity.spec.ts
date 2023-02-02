import { Multiplicity } from '../src/enums/Multiplicity';
import { expect } from 'chai';

describe('Multiplicity', function () {
  describe('SingleSelect', function () {
    it('should return the correct value', function () {
      const result = Multiplicity.SingleSelect;
      expect(result).to.equal('SingleSelect');
    });
  });

  describe('MultiSelect', function () {
    it('should return the correct value', function () {
      const result = Multiplicity.MultiSelect;
      expect(result).to.equal('MultiSelect');
    });
  });
});
