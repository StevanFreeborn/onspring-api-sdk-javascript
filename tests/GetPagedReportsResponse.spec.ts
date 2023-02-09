import { GetPagedReportsResponse } from '../src/models/GetPagedReportsResponse';
import { expect } from 'chai';

describe('GetPagedReportsResponse', function () {
  it('should be defined', function () {
    expect(GetPagedReportsResponse).to.be.not.undefined;
  });

  it('should have a constructor', function () {
    expect(GetPagedReportsResponse).to.have.property('constructor');
  });

  it('should have a constructor that takes 5 arguments', function () {
    expect(GetPagedReportsResponse).to.have.lengthOf(5);
  });

  it('should create a new instance of GetPagedReportsResponse', function () {
    expect(new GetPagedReportsResponse([], 1, 1, 1, 1)).to.be.an.instanceOf(
      GetPagedReportsResponse
    );
  });

  it('should set its properties correctly', function () {
    const response = new GetPagedReportsResponse([], 1, 1, 1, 1);
    expect(response.items).to.be.an('array');
    expect(response.pageNumber).to.be.equal(1);
    expect(response.pageSize).to.be.equal(1);
    expect(response.totalPages).to.be.equal(1);
    expect(response.totalRecords).to.be.equal(1);
  });
});
