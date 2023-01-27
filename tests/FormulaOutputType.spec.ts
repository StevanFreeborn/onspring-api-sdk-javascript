import { FormulaOutputType } from '../src/enums/FormulaOutputType';
import { expect } from 'chai';

describe('FormulaOutputType', function () {
  describe('Text', function () {
    it('should return the correct value', function () {
      const result = FormulaOutputType.Text;
      expect(result).to.equal('Text');
    });
  });

  describe('Numeric', function () {
    it('should return the correct value', function () {
      const result = FormulaOutputType.Numeric;
      expect(result).to.equal('Numeric');
    });
  });

  describe('DateAndTime', function () {
    it('should return the correct value', function () {
      const result = FormulaOutputType.DateAndTime;
      expect(result).to.equal('DateAndTime');
    });
  });

  describe('ListValue', function () {
    it('should return the correct value', function () {
      const result = FormulaOutputType.ListValue;
      expect(result).to.equal('ListValue');
    });
  });
});