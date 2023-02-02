import { ResultValueType } from '../src/enums/ResultValueType';
import { expect } from 'chai';

describe('ResultValueType', function () {
  describe('String', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.String;
      expect(result).to.equal('String');
    });
  });

  describe('Integer', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.Integer;
      expect(result).to.equal('Integer');
    });
  });

  describe('Decimal', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.Decimal;
      expect(result).to.equal('Decimal');
    });
  });

  describe('Date', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.Date;
      expect(result).to.equal('Date');
    });
  });

  describe('TimeSpan', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.TimeSpan;
      expect(result).to.equal('TimeSpan');
    });
  });

  describe('Guid', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.Guid;
      expect(result).to.equal('Guid');
    });
  });

  describe('StringList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.StringList;
      expect(result).to.equal('StringList');
    });
  });

  describe('IntegerList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.IntegerList;
      expect(result).to.equal('IntegerList');
    });
  });

  describe('GuidList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.GuidList;
      expect(result).to.equal('GuidList');
    });
  });

  describe('AttachmentList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.AttachmentList;
      expect(result).to.equal('AttachmentList');
    });
  });

  describe('ScoringGroupList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.ScoringGroupList;
      expect(result).to.equal('ScoringGroupList');
    });
  });

  describe('FileList', function () {
    it('should return the correct value', function () {
      const result = ResultValueType.FileList;
      expect(result).to.equal('FileList');
    });
  });
});
