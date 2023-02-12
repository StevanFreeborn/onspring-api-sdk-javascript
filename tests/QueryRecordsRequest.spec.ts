import { QueryRecordsRequest } from '../src/models/QueryRecordsRequest';
import { expect } from 'chai';
import { DataFormat } from '../src/enums/DataFormat';
import { PagingRequest } from '../src/models/PagingRequest';

describe('QueryRecordsRequest', function () {
  it('should be defined', function () {
    expect(QueryRecordsRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(QueryRecordsRequest).to.have.property('constructor');
  });

  it('should have a constructor that takes 2 parameters', function () {
    expect(QueryRecordsRequest).to.have.lengthOf(2);
  });

  it('should have an appId property', function () {
    expect(new QueryRecordsRequest(1, 'filter')).to.have.property('appId');
  });

  it('should have a filter property', function () {
    expect(new QueryRecordsRequest(1, 'filter')).to.have.property('filter');
  });

  it('should have a fieldIds property', function () {
    expect(new QueryRecordsRequest(1, 'filter')).to.have.property('fieldIds');
  });

  it('should have a dataFormat property', function () {
    expect(new QueryRecordsRequest(1, 'filter')).to.have.property('dataFormat');
  });

  it('should have a pagingRequest property', function () {
    expect(new QueryRecordsRequest(1, 'filter')).to.have.property(
      'pagingRequest'
    );
  });

  it('should have a constructor that sets its properties correctly', function () {
    const appId = 1;
    const filter = 'filter';
    const fieldIds = [1, 2, 3];
    const dataFormat = DataFormat.Raw;
    const pagingRequest = new PagingRequest(1, 50);

    const request = new QueryRecordsRequest(
      appId,
      filter,
      fieldIds,
      dataFormat,
      pagingRequest
    );

    expect(request).to.have.property('appId', appId);
    expect(request).to.have.property('filter', filter);
    expect(request).to.have.property('fieldIds', fieldIds);
    expect(request).to.have.property('dataFormat', dataFormat);
    expect(request).to.have.property('pagingRequest', pagingRequest);
  });
});
