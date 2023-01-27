import { EndpointFactory } from '../src/models/EndpointFactory';
import { expect } from 'chai';

describe('EndpointFactory', function () {
  const baseUrl = 'https://api.onspring.com';

  describe('getPingEndpoint', function () {
    it('should return the correct ping endpoint', function () {
      const result = EndpointFactory.getPingEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Ping`);
    });
  });

  describe('getAppsEndpoint', function () {
    it('should return the correct apps endpoint', function () {
      const result = EndpointFactory.getAppsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Apps`);
    });
  });

  describe('getAppByIdEndpoint', function () {
    it('should return the correct app by id endpoint', function () {
      const result = EndpointFactory.getAppByIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Apps/id/1`);
    });
  });

  describe('getAppsByIdsEndpoint', function () {
    it('should return the correct apps by ids endpoint', function () {
      const result = EndpointFactory.getAppsByIdsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Apps/batch-get`);
    });
  });

  describe('getFieldByIdEndpoint', function () {
    it('should return the correct field by id endpoint', function () {
      const result = EndpointFactory.getFieldByIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Fields/id/1`);
    });
  });

  describe('getFieldsByIdsEndpoint', function () {
    it('should return the correct fields by ids endpoint', function () {
      const result = EndpointFactory.getFieldsByIdsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Fields/batch-get`);
    });
  });

  describe('getFieldsByAppIdEndpoint', function () {
    it('should return the correct fields by app id endpoint', function () {
      const result = EndpointFactory.getFieldsByAppIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Fields/appId/1`);
    });
  });

  describe('getFileInfoByIdEndpoint', function () {
    it('should return the correct get     file info endpoint', function () {
      const result = EndpointFactory.getFileInfoByIdEndpoint(baseUrl, 1, 2, 3);
      expect(result).to.equal(`${baseUrl}/Files/recordId/1/fieldId/2/fileId/3`);
    });
  });

  describe('getDeleteFileByIdEndpoint', function () {
    it('should return the correct delete file endpoint', function () {
      const result = EndpointFactory.getDeleteFileByIdEndpoint(
        baseUrl,
        1,
        2,
        3
      );
      expect(result).to.equal(
        `${baseUrl}/Files/recordId/1/fieldId/2/fileId/3/file`
      );
    });
  });

  describe('getFileByIdEndpoint', function () {
    it('should return the correct get file endpoint', function () {
      const result = EndpointFactory.getFileByIdEndpoint(baseUrl, 1, 2, 3);
      expect(result).to.equal(
        `${baseUrl}/Files/recordId/1/fieldId/2/fileId/3/file`
      );
    });
  });

  describe('getSaveFileEndpoint', function () {
    it('should return the correct save file endpoint', function () {
      const result = EndpointFactory.getSaveFileEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Files`);
    });
  });

  describe('getAddOrUpdateListItemEndpoint', function () {
    it('should return the correct add or update list item endpoint', function () {
      const result = EndpointFactory.getAddOrUpdateListItemEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Lists/id/1/items`);
    });
  });

  describe('getDeleteListItemEndpoint', function () {
    it('should return the correct delete list item endpoint', function () {
      const result = EndpointFactory.getDeleteListItemEndpoint(
        baseUrl,
        1,
        '612ac495-8aad-44fd-b57d-1ae798dcf1a5'
      );
      expect(result).to.equal(
        `${baseUrl}/Lists/id/1/itemId/612ac495-8aad-44fd-b57d-1ae798dcf1a5`
      );
    });
  });

  describe('getRecordsByAppIdEndpoint', function () {
    it('should return the correct records by app id endpoint', function () {
      const result = EndpointFactory.getRecordsByAppIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Records/appId/1`);
    });
  });

  describe('getRecordByIdEndpoint', function () {
    it('should return the correct record by id endpoint', function () {
      const result = EndpointFactory.getRecordByIdEndpoint(baseUrl, 1, 2);
      expect(result).to.equal(`${baseUrl}/Records/appId/1/recordId/2`);
    });
  });

  describe('getDeleteRecordByIdEndpoint', function () {
    it('should return the correct delete record by id endpoint', function () {
      const result = EndpointFactory.getDeleteRecordByIdEndpoint(baseUrl, 1, 2);
      expect(result).to.equal(`${baseUrl}/Records/appId/1/recordId/2`);
    });
  });

  describe('getRecordsByIdsEndpoint', function () {
    it('should return the correct records by ids endpoint', function () {
      const result = EndpointFactory.getRecordsByIdsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Records/batch-get`);
    });
  });

  describe('getQueryRecordsEndpoint', function(){
    it('should return the correct query records endpoint', function(){
      const result = EndpointFactory.getQueryRecordsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Records/query`);
    });
  });

  describe('getAddOrUpdateRecordEndpoint', function () {
    it('should return the correct add or update record endpoint', function () {
      const result = EndpointFactory.getAddOrUpdateRecordEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Records`);
    });
  });

  describe('getDeleteRecordsByIdsEndpoint', function () {
    it('should return the correct delete records by ids endpoint', function () {
      const result = EndpointFactory.getDeleteRecordsByIdsEndpoint(baseUrl);
      expect(result).to.equal(`${baseUrl}/Records/batch-delete`);
    });
  });

  describe('getReportByIdEndpoint', function () {
    it('should return the correct report by id endpoint', function () {
      const result = EndpointFactory.getReportByIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Reports/id/1`);
    });
  });

  describe('getReportsByAppIdEndpoint', function () {
    it('should return the correct reports by app id endpoint', function () {
      const result = EndpointFactory.getReportsByAppIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Reports/appId/1`);
    });
  });
});
