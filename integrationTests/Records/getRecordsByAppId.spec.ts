import { GetRecordsByAppIdRequest } from './../../src/models/GetRecordsByAppIdRequest';
import { DataFormat, OnspringClient, PagingRequest } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getRecordsByAppId', function () {
  this.timeout(30000);
  this.retries(3);

  it('should get records', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_RECORD_ID === undefined) {
      expect.fail('TEST_SURVEY_RECORD_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const request = new GetRecordsByAppIdRequest(appId);

    const response = await client.getRecordsByAppId(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.items).to.not.be.null;

      response.data.items.forEach((record) => {
        expect(record.appId).to.equal(appId);
        expect(record.recordId).to.not.be.null;
        expect(record.fieldData).to.not.be.null;

        if (record.fieldData != null) {
          expect(record.fieldData.length).to.be.greaterThan(0);

          record.fieldData.forEach((field) => {
            expect(field.fieldId).to.not.be.null;
            expect(field.value).to.not.be.null;
            expect(field.type).to.not.be.null;
          });
        }
      });
    }
  });

  it('should get records when fieldIds, paging information, and data format are passed as parameters', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_FIELD_ID === undefined) {
      expect.fail('TEST_FIELD_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const fieldId = parseInt(process.env.TEST_FIELD_ID);
    const request = new GetRecordsByAppIdRequest(
      appId,
      [fieldId],
      DataFormat.Formatted,
      new PagingRequest(1, 1)
    );

    const response = await client.getRecordsByAppId(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.items).to.not.be.null;

      response.data.items.forEach((record) => {
        expect(record.appId).to.equal(appId);
        expect(record.recordId).to.not.be.null;
        expect(record.fieldData).to.not.be.null;

        if (record.fieldData != null) {
          expect(record.fieldData.length).to.be.greaterThan(0);

          record.fieldData.forEach((field) => {
            expect(field.fieldId).to.not.be.null;
            expect(field.value).to.not.be.null;
            expect(field.type).to.not.be.null;
          });
        }
      });
    }
  });

  it('should return a 401 error when an invalid API key is passed', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const request = new GetRecordsByAppIdRequest(0);
    const response = await client.getRecordsByAppId(request);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when the api key does not have access to the app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const request = new GetRecordsByAppIdRequest(
      parseInt(process.env.TEST_APP_ID_NO_ACCESS)
    );

    const response = await client.getRecordsByAppId(request);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
