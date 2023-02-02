import { GetPagedAppsResponse } from '../src/models/GetPagedAppsResponse';
import { expect } from 'chai';
import { App } from '../src/models/App';

describe('GetPagedAppsResponse', function () {
  it('should be defined', function () {
    expect(GetPagedAppsResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetPagedAppsResponse).to.have.property('constructor');
  });

  it('should have 4 parameters', function () {
    expect(GetPagedAppsResponse).to.have.lengthOf(5);
  });

  it('should construct a new instance of GetPagedAppsResponse', function () {
    const getPagedAppsResponse = new GetPagedAppsResponse([new App('test', 1, 'test'), new App('test', 1, 'test')], 1, 10, 100, 100);

    expect(getPagedAppsResponse).to.not.be.undefined;
    expect(getPagedAppsResponse).to.be.instanceOf(GetPagedAppsResponse);
    expect(getPagedAppsResponse).to.have.property('items').to.be.an('array').to.have.lengthOf(2);
    expect(getPagedAppsResponse).to.have.property('pageNumber').to.be.a('number').to.equal(1);
    expect(getPagedAppsResponse).to.have.property('pageSize').to.be.a('number').to.equal(10);
    expect(getPagedAppsResponse).to.have.property('totalPages').to.be.a('number').to.equal(100);
    expect(getPagedAppsResponse).to.have.property('totalRecords').to.be.a('number').to.equal(100);
  });
});