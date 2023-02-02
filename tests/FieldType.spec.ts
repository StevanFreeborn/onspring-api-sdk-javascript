import { FieldType } from '../src/enums/FieldType';
import { expect } from 'chai';

describe('FieldType', function () {
  describe('Text', function () {
    it('should return the correct value', function () {
      const result = FieldType.Text;
      expect(result).to.equal('Text');
    });
  });

  describe('Number', function () {
    it('should return the correct value', function () {
      const result = FieldType.Number;
      expect(result).to.equal('Number');
    });
  });

  describe('AutoNumber', function () {
    it('should return the correct value', function () {
      const result = FieldType.AutoNumber;
      expect(result).to.equal('AutoNumber');
    });
  });

  describe('Date', function () {
    it('should return the correct value', function () {
      const result = FieldType.Date;
      expect(result).to.equal('Date');
    });
  });

  describe('TimeSpan', function () {
    it('should return the correct value', function () {
      const result = FieldType.TimeSpan;
      expect(result).to.equal('TimeSpan');
    });
  });

  describe('List', function () {
    it('should return the correct value', function () {
      const result = FieldType.List;
      expect(result).to.equal('List');
    });
  });

  describe('Reference', function () {
    it('should return the correct value', function () {
      const result = FieldType.Reference;
      expect(result).to.equal('Reference');
    });
  });

  describe('SurveyReference', function () {
    it('should return the correct value', function () {
      const result = FieldType.SurveyReference;
      expect(result).to.equal('SurveyReference');
    });
  });

  describe('SurveyGroupScoring', function () {
    it('should return the correct value', function () {
      const result = FieldType.SurveyGroupScoring;
      expect(result).to.equal('SurveyGroupScoring');
    });
  });

  describe('SurveyCampaign', function () {
    it('should return the correct value', function () {
      const result = FieldType.SurveyCampaign;
      expect(result).to.equal('SurveyCampaign');
    });
  });

  describe('SurveyUnifiedAnswer', function () {
    it('should return the correct value', function () {
      const result = FieldType.SurveyUnifiedAnswer;
      expect(result).to.equal('SurveyUnifiedAnswer');
    });
  });

  describe('Attachment', function () {
    it('should return the correct value', function () {
      const result = FieldType.Attachment;
      expect(result).to.equal('Attachment');
    });
  });
});
