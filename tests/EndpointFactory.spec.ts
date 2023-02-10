import { EndpointFactory } from '../src/models/EndpointFactory';
import { expect } from 'chai';
import { PagingRequest } from '../src/models/PagingRequest';
import { DataFormat } from '../src/enums/DataFormat';
import { ReportDataType } from '../src/enums/ReportDataType';

describe('EndpointFactory', function () {
  describe('getPingEndpoint', function () {
    it('should return the correct ping endpoint', function () {
      const result = EndpointFactory.getPingEndpoint();
      expect(result).to.equal('/Ping');
    });
  });

  describe('getAppsEndpoint', function () {
    it('should return the correct apps endpoint with paging params based on paging request parameter passed', function () {
      const result = EndpointFactory.getAppsEndpoint(
        new PagingRequest(2, 1000)
      );
      expect(result).to.equal('/Apps?pageSize=1000&pageNumber=2');
    });
  });

  describe('getAppByIdEndpoint', function () {
    it('should return the correct app by id endpoint', function () {
      const result = EndpointFactory.getAppByIdEndpoint(1);
      expect(result).to.equal('/Apps/id/1');
    });
  });

  describe('getAppsByIdsEndpoint', function () {
    it('should return the correct apps by ids endpoint', function () {
      const result = EndpointFactory.getAppsByIdsEndpoint();
      expect(result).to.equal('/Apps/batch-get');
    });
  });

  describe('getFieldByIdEndpoint', function () {
    it('should return the correct field by id endpoint', function () {
      const result = EndpointFactory.getFieldByIdEndpoint(1);
      expect(result).to.equal('/Fields/id/1');
    });
  });

  describe('getFieldsByIdsEndpoint', function () {
    it('should return the correct fields by ids endpoint', function () {
      const result = EndpointFactory.getFieldsByIdsEndpoint();
      expect(result).to.equal('/Fields/batch-get');
    });
  });

  describe('getFieldsByAppIdEndpoint', function () {
    it('should return the correct fields by app id endpoint', function () {
      const result = EndpointFactory.getFieldsByAppIdEndpoint(
        1,
        new PagingRequest(2, 1000)
      );
      expect(result).to.equal('/Fields/appId/1?pageSize=1000&pageNumber=2');
    });
  });

  describe('getFileInfoByIdEndpoint', function () {
    it('should return the correct get     file info endpoint', function () {
      const result = EndpointFactory.getFileInfoByIdEndpoint(1, 2, 3);
      expect(result).to.equal('/Files/recordId/1/fieldId/2/fileId/3');
    });
  });

  describe('getDeleteFileByIdEndpoint', function () {
    it('should return the correct delete file endpoint', function () {
      const result = EndpointFactory.getDeleteFileByIdEndpoint(1, 2, 3);
      expect(result).to.equal('/Files/recordId/1/fieldId/2/fileId/3/file');
    });
  });

  describe('getFileByIdEndpoint', function () {
    it('should return the correct get file endpoint', function () {
      const result = EndpointFactory.getFileByIdEndpoint(1, 2, 3);
      expect(result).to.equal('/Files/recordId/1/fieldId/2/fileId/3/file');
    });
  });

  describe('getSaveFileEndpoint', function () {
    it('should return the correct save file endpoint', function () {
      const result = EndpointFactory.getSaveFileEndpoint();
      expect(result).to.equal('/Files');
    });
  });

  describe('getAddOrUpdateListItemEndpoint', function () {
    it('should return the correct add or update list item endpoint', function () {
      const result = EndpointFactory.getAddOrUpdateListItemEndpoint(1);
      expect(result).to.equal('/Lists/id/1/items');
    });
  });

  describe('getDeleteListItemEndpoint', function () {
    it('should return the correct delete list item endpoint', function () {
      const result = EndpointFactory.getDeleteListItemEndpoint(
        1,
        '612ac495-8aad-44fd-b57d-1ae798dcf1a5'
      );
      expect(result).to.equal(
        '/Lists/id/1/itemId/612ac495-8aad-44fd-b57d-1ae798dcf1a5'
      );
    });
  });

  describe('getRecordsByAppIdEndpoint', function () {
    it('should return the correct records by app id endpoint', function () {
      const result = EndpointFactory.getRecordsByAppIdEndpoint(1);
      expect(result).to.equal('/Records/appId/1');
    });
  });

  describe('getRecordByIdEndpoint', function () {
    it('should return the correct record by id endpoint', function () {
      const result = EndpointFactory.getRecordByIdEndpoint(1, 2);
      expect(result).to.equal('/Records/appId/1/recordId/2');
    });
  });

  describe('getDeleteRecordByIdEndpoint', function () {
    it('should return the correct delete record by id endpoint', function () {
      const result = EndpointFactory.getDeleteRecordByIdEndpoint(1, 2);
      expect(result).to.equal('/Records/appId/1/recordId/2');
    });
  });

  describe('getRecordsByIdsEndpoint', function () {
    it('should return the correct records by ids endpoint', function () {
      const result = EndpointFactory.getRecordsByIdsEndpoint();
      expect(result).to.equal('/Records/batch-get');
    });
  });

  describe('getQueryRecordsEndpoint', function () {
    it('should return the correct query records endpoint', function () {
      const result = EndpointFactory.getQueryRecordsEndpoint();
      expect(result).to.equal('/Records/query');
    });
  });

  describe('getAddOrUpdateRecordEndpoint', function () {
    it('should return the correct add or update record endpoint', function () {
      const result = EndpointFactory.getAddOrUpdateRecordEndpoint();
      expect(result).to.equal('/Records');
    });
  });

  describe('getDeleteRecordsByIdsEndpoint', function () {
    it('should return the correct delete records by ids endpoint', function () {
      const result = EndpointFactory.getDeleteRecordsByIdsEndpoint();
      expect(result).to.equal('/Records/batch-delete');
    });
  });

  describe('getReportByIdEndpoint', function () {
    it('should return the correct report by id endpoint', function () {
      const result = EndpointFactory.getReportByIdEndpoint(
        1,
        DataFormat.Raw,
        ReportDataType.ReportData
      );
      expect(result).to.equal(
        '/Reports/id/1?apiDataFormat=Raw&dataType=ReportData'
      );
    });
  });

  describe('getReportsByAppIdEndpoint', function () {
    it('should return the correct reports by app id endpoint', function () {
      const result = EndpointFactory.getReportsByAppIdEndpoint(
        1,
        new PagingRequest(2, 1000)
      );
      expect(result).to.equal('/Reports/appId/1?pageSize=1000&pageNumber=2');
    });
  });
});
