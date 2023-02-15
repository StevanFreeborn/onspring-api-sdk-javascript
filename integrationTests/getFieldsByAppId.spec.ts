import { OnspringClient, PagingRequest } from '../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from './mochaRootHooks';

describe('getFieldsByAppId', function () {
  it('should return a paged list of fields', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      return expect.fail('TEST_SURVEY_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const response = await client.getFieldsByAppId(appId);

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
          expect(item.appId).to.not.be.null;
          expect(item.type).to.not.be.null;
          expect(item.status).to.not.be.null;
          expect(item.isRequired).to.not.be.null;
          expect(item.isUnique).to.not.be.null;
        });
      }
    }
  });

  it('should return a paged list of fields with with correct page size and number when passed paging request', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      return expect.fail('TEST_SURVEY_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const response = await client.getFieldsByAppId(
      appId,
      new PagingRequest(1, 1)
    );

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
          expect(item.appId).to.not.be.null;
          expect(item.type).to.not.be.null;
          expect(item.status).to.not.be.null;
          expect(item.isRequired).to.not.be.null;
          expect(item.isUnique).to.not.be.null;
        });
      }
    }
  });

  it('should return a 400 response when an invalid page size is used', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      return expect.fail('TEST_SURVEY_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const response = await client.getFieldsByAppId(appId, {
      pageNumber: 1,
      pageSize: 1001,
    });

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });

  it('should return a 401 response when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getFieldsByAppId(1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when api key does not have access to the app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      return expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const appId = parseInt(process.env.TEST_APP_ID_NO_ACCESS);
    const response = await client.getFieldsByAppId(appId);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });
});
