import { ReportDataType } from '../src/enums/ReportDataType';
import { expect } from 'chai';

describe('ReportDataType', function () {
  describe('ReportData', function () {
    it('should return the correct value', function () {
      const result = ReportDataType.ReportData;
      expect(result).to.equal('ReportData');
    });
  });

  describe('ChartData', function () {
    it('should return the correct value', function () {
      const result = ReportDataType.ChartData;
      expect(result).to.equal('ChartData');
    });
  });
});
