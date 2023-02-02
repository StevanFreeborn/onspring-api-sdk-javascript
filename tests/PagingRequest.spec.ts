import { PagingRequest } from '../src/models/PagingRequest';
import { expect } from 'chai';

describe('PagingRequest', function () {
  it('should be defined', function () {
    expect(PagingRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(PagingRequest).to.have.property('constructor');
  });

  it('should have 2 parameters', function () {
    expect(PagingRequest).to.have.lengthOf(2);
  });

  it('should throw an error when the pageNumber is less than 1', function () {
    expect(() => new PagingRequest(0, 1)).to.throw(
      'pageNumber must be greater than 0.'
    );
  });

  it('should throw an error when the pageSize is less than 1', function () {
    expect(() => new PagingRequest(1, 0)).to.throw(
      'pageSize must be greater than 0 and less than 1001.'
    );
  });

  it('should throw an error when the pageSize is greater than 1000', function () {
    expect(() => new PagingRequest(1, 1001)).to.throw(
      'pageSize must be greater than 0 and less than 1001.'
    );
  });

  it('should create a new instance of the PagingRequest class when the pageNumber is greater than 0 and the pageSize is between 1 and 1000', function () {
    expect(() => new PagingRequest(1, 1)).to.not.throw();
  });

  it('should create a new instance of the PagingRequest class with the correct properties and values', function () {
    const pagingRequest = new PagingRequest(1, 1);

    expect(pagingRequest).to.have.property('pageNumber');
    expect(pagingRequest).to.have.property('pageSize');
    expect(pagingRequest.pageNumber).to.equal(1);
    expect(pagingRequest.pageSize).to.equal(1);
  });
});
