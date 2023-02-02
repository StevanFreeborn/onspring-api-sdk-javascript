import { PagedResponse } from '../src/models/PagedResponse';
import { expect } from 'chai';

describe('PagedResponse', function () {
  it('should be defined', function () {
    expect(PagedResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(PagedResponse).to.have.property('constructor');
  });

  it('should have 4 parameters', function () {
    expect(PagedResponse).to.have.lengthOf(5);
  });

  it('should construct a new instance of PagedResponse', function () {
    const pagedResponse = new PagedResponse<number>([1, 2, 3, 4], 1, 10, 100, 100);

    expect(pagedResponse).to.not.be.undefined;
    expect(pagedResponse).to.be.instanceOf(PagedResponse);
    expect(pagedResponse).to.have.property('items').to.be.an('array').to.have.lengthOf(4);
    expect(pagedResponse).to.have.property('pageNumber').to.be.a('number').to.equal(1);
    expect(pagedResponse).to.have.property('pageSize').to.be.a('number').to.equal(10);
    expect(pagedResponse).to.have.property('totalPages').to.be.a('number').to.equal(100);
    expect(pagedResponse).to.have.property('totalRecords').to.be.a('number').to.equal(100);
  });
});
