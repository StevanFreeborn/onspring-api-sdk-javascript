import {
  DataFormat,
  FilterOperators,
  OnspringClient,
  PagingRequest,
  QueryFilter,
  QueryRecordsRequest,
} from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('queryRecords', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return records', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_AUTO_NUMBER_FIELD === undefined) {
      expect.fail('TEST_SURVEY_AUTO_NUMBER_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const fieldId = parseInt(process.env.TEST_SURVEY_AUTO_NUMBER_FIELD);
    const filter = new QueryFilter(fieldId, FilterOperators.GreaterThan, 0);
    const request = new QueryRecordsRequest(appId, filter.toString());
    const response = await client.queryRecords(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;

      response.data.items.forEach((record) => {
        expect(record.appId).to.equal(appId);
        expect(record.recordId).to.not.be.null;
        expect(record.fieldData).to.not.be.null;

        if (record.fieldData != null) {
          record.fieldData.forEach((field) => {
            expect(field.fieldId).to.not.be.null;
            expect(field.value).to.not.be.null;
            expect(field.type).to.not.be.undefined;
          });
        }
      });
    }
  });

  it('should return records when data format, paging information, and fields are passed as parameters', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_AUTO_NUMBER_FIELD === undefined) {
      expect.fail('TEST_SURVEY_AUTO_NUMBER_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const fieldId = parseInt(process.env.TEST_SURVEY_AUTO_NUMBER_FIELD);
    const filter = new QueryFilter(fieldId, FilterOperators.GreaterThan, 0);
    const request = new QueryRecordsRequest(
      appId,
      filter.toString(),
      [fieldId],
      DataFormat.Formatted,
      new PagingRequest(1, 1)
    );

    const response = await client.queryRecords(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;

      response.data.items.forEach((record) => {
        expect(record.appId).to.equal(appId);
        expect(record.recordId).to.not.be.null;
        expect(record.fieldData).to.not.be.null;

        if (record.fieldData != null) {
          record.fieldData.forEach((field) => {
            expect(field.fieldId).to.not.be.null;
            expect(field.value).to.not.be.null;
            expect(field.type).to.not.be.undefined;
          });
        }
      });
    }
  });

  it('should return a 400 error if page size is invalid', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const request = new QueryRecordsRequest(1, '', [], DataFormat.Formatted, {
      pageNumber: 1,
      pageSize: 1001,
    });

    const response = await client.queryRecords(request);

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error if the API key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const request = new QueryRecordsRequest(1, '');
    const response = await client.queryRecords(request);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error if the API key does not have access to the app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    if (process.env.TEST_SURVEY_AUTO_NUMBER_FIELD === undefined) {
      expect.fail('TEST_SURVEY_AUTO_NUMBER_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_APP_ID_NO_ACCESS);
    const fieldId = parseInt(process.env.TEST_SURVEY_AUTO_NUMBER_FIELD);
    const filter = new QueryFilter(fieldId, FilterOperators.GreaterThan, 0);
    const request = new QueryRecordsRequest(appId, filter.toString());
    const response = await client.queryRecords(request);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
