import { GetRecordsByAppIdRequest } from '../src/models/GetRecordsByAppIdRequest';
import { expect } from 'chai';
import { DataFormat } from '../src/enums/DataFormat';

describe('GetRecordsByAppIdRequest', function () {
  it('should be defined', function () {
    expect(GetRecordsByAppIdRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetRecordsByAppIdRequest).to.have.property('constructor');
  });

  it('should have a constructor that takes 1 parameter', function () {
    expect(GetRecordsByAppIdRequest).to.have.a.lengthOf(1);
  });

  it('should have an appId property', function () {
    expect(new GetRecordsByAppIdRequest(1)).to.have.property('appId');
  });

  it('should have a fieldIds property', function () {
    expect(new GetRecordsByAppIdRequest(1)).to.have.property('fieldIds');
  });

  it('should have a dataFormat property', function () {
    expect(new GetRecordsByAppIdRequest(1)).to.have.property('dataFormat');
  });

  it('should have a pagingRequest property', function () {
    expect(new GetRecordsByAppIdRequest(1)).to.have.property('pagingRequest');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const appId = 1;
    const fieldIds = [1, 2, 3];
    const dataFormat = DataFormat.Raw;
    const pagingRequest = { pageNumber: 1, pageSize: 50 };

    const request = new GetRecordsByAppIdRequest(
      appId,
      fieldIds,
      dataFormat,
      pagingRequest
    );

    expect(request).to.have.property('appId', appId);
    expect(request).to.have.property('fieldIds', fieldIds);
    expect(request).to.have.property('dataFormat', dataFormat);
    expect(request).to.have.property('pagingRequest', pagingRequest);
  });
});
