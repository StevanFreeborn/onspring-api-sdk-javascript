import { GetPagedRecordsResponse } from '../src/models/GetPagedRecordsResponse';
import { expect } from 'chai';

describe('GetPagedRecordsResponse', function () {
  it('should be defined', function () {
    expect(GetPagedRecordsResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetPagedRecordsResponse).to.have.property('constructor');
  });

  it('should have a constructor that takes 5 parameters', function () {
    expect(GetPagedRecordsResponse).to.have.lengthOf(5);
  });

  it('should have a items property', function () {
    expect(new GetPagedRecordsResponse([], 1, 1, 1, 1)).to.have.property(
      'items'
    );
  });

  it('should have a pageNumber property', function () {
    expect(new GetPagedRecordsResponse([], 1, 1, 1, 1)).to.have.property(
      'pageNumber'
    );
  });

  it('should have a pageSize property', function () {
    expect(new GetPagedRecordsResponse([], 1, 1, 1, 1)).to.have.property(
      'pageSize'
    );
  });

  it('should have a totalPages property', function () {
    expect(new GetPagedRecordsResponse([], 1, 1, 1, 1)).to.have.property(
      'totalPages'
    );
  });

  it('should have a totalRecords property', function () {
    expect(new GetPagedRecordsResponse([], 1, 1, 1, 1)).to.have.property(
      'totalRecords'
    );
  });

  it('should have a constructor that sets the items property', function () {
    const items = [];
    const pageNumber = 1;
    const pageSize = 1;
    const totalPages = 1;
    const totalRecords = 1;

    const response = new GetPagedRecordsResponse(
      items,
      pageNumber,
      pageSize,
      totalPages,
      totalRecords
    );

    expect(response).to.have.property('items', items);
    expect(response).to.have.property('pageNumber', pageNumber);
    expect(response).to.have.property('pageSize', pageSize);
    expect(response).to.have.property('totalPages', totalPages);
    expect(response).to.have.property('totalRecords', totalRecords);
  });
});
