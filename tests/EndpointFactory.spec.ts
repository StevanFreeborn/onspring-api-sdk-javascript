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
      const result = EndpointFactory.getDeleteFileByIdEndpoint(baseUrl, 1, 2, 3);
      expect(result).to.equal(`${baseUrl}/Files/recordId/1/fieldId/2/fileId/3/file`);
    });
  });

  describe('getFileByIdEndpoint', function () {
    it('should return the correct get file endpoint', function () {
      const result = EndpointFactory.getFileByIdEndpoint(baseUrl, 1, 2, 3);
      expect(result).to.equal(`${baseUrl}/Files/recordId/1/fieldId/2/fileId/3/file`);
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
      const result = EndpointFactory.getDeleteListItemEndpoint(baseUrl, 1, '612ac495-8aad-44fd-b57d-1ae798dcf1a5');
      expect(result).to.equal(`${baseUrl}/Lists/id/1/itemId/612ac495-8aad-44fd-b57d-1ae798dcf1a5`);
    });
  });

  describe('getRecordsByAppIdEndpoint', function () { 
    it('should return the correct records by app id endpoint', function () {
      const result = EndpointFactory.getRecordsByAppIdEndpoint(baseUrl, 1);
      expect(result).to.equal(`${baseUrl}/Records/appId/1`);
    });
  });
});
