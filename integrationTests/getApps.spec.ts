import { OnspringClient, PagingRequest } from '../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from './mochaRootHooks';

describe('getApps', function () {
  it('should return a paged list of apps', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getApps();

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.items).to.not.be.null;

      if (response.data.items != null) {
        expect(response.data.items.length).to.be.greaterThan(0);
        response.data.items.forEach((item) => {
          expect(item.id).to.not.be.null;
          expect(item.name).to.not.be.null;
          expect(item.href).to.not.be.null;
        });
      }
    }
  });

  it('should return a paged list of apps with with correct page size and number when passed paging request', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getApps(new PagingRequest(1, 1));

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.equal(1);
      expect(response.data.pageSize).to.equal(1);
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.items).to.not.be.null;

      if (response.data.items != null) {
        expect(response.data.items.length).to.equal(1);
        response.data.items.forEach((item) => {
          expect(item.id).to.not.be.null;
          expect(item.name).to.not.be.null;
          expect(item.href).to.not.be.null;
        });
      }
    }
  });

  it('should return a 400 response when an invalid page size is used', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getApps({ pageNumber: 1, pageSize: 1001 });

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });

  it('should return a 401 response when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getApps();

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});
