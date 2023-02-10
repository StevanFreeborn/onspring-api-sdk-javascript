import { RecordValueType } from '../src/enums/RecordValueType';
import { expect } from 'chai';

describe('RecordValueType', function () {
  describe('String', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.String;
      expect(result).to.equal('String');
    });
  });

  describe('Integer', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.Integer;
      expect(result).to.equal('Integer');
    });
  });

  describe('Decimal', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.Decimal;
      expect(result).to.equal('Decimal');
    });
  });

  describe('Date', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.Date;
      expect(result).to.equal('Date');
    });
  });

  describe('TimeSpan', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.TimeSpan;
      expect(result).to.equal('TimeSpan');
    });
  });

  describe('Guid', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.Guid;
      expect(result).to.equal('Guid');
    });
  });

  describe('StringList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.StringList;
      expect(result).to.equal('StringList');
    });
  });

  describe('IntegerList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.IntegerList;
      expect(result).to.equal('IntegerList');
    });
  });

  describe('GuidList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.GuidList;
      expect(result).to.equal('GuidList');
    });
  });

  describe('AttachmentList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.AttachmentList;
      expect(result).to.equal('AttachmentList');
    });
  });

  describe('ScoringGroupList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.ScoringGroupList;
      expect(result).to.equal('ScoringGroupList');
    });
  });

  describe('FileList', function () {
    it('should return the correct value', function () {
      const result = RecordValueType.FileList;
      expect(result).to.equal('FileList');
    });
  });
});
