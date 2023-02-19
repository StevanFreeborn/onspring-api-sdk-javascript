import { OnspringClient, GetRecordRequest, DataFormat } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getRecordById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should get a record', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_RECORD_ID === undefined) {
      expect.fail('TEST_SURVEY_RECORD_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const recordId = parseInt(process.env.TEST_SURVEY_RECORD_ID);
    const request = new GetRecordRequest(appId, recordId);
    const response = await client.getRecordById(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.appId).to.equal(appId);
      expect(response.data.recordId).to.equal(recordId);
      expect(response.data.fieldData).to.not.be.null;

      if (response.data.fieldData != null) {
        expect(response.data.fieldData.length).to.be.greaterThan(0);

        response.data.fieldData.forEach((field) => {
          expect(field.fieldId).to.not.be.null;
          expect(field).to.not.be.null;
          expect(field.type).to.not.be.null;
        });
      }
    }
  });

  it('should get a record when fieldIds and data format are passed as parameters', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_RECORD_ID === undefined) {
      expect.fail('TEST_SURVEY_RECORD_ID is not defined');
    }

    if (process.env.TEST_FIELD_ID === undefined) {
      expect.fail('TEST_FIELD_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const recordId = parseInt(process.env.TEST_SURVEY_RECORD_ID);
    const fieldId = parseInt(process.env.TEST_FIELD_ID);
    const request = new GetRecordRequest(
      appId,
      recordId,
      [fieldId],
      DataFormat.Formatted
    );

    const response = await client.getRecordById(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.appId).to.equal(appId);
      expect(response.data.recordId).to.equal(recordId);
      expect(response.data.fieldData).to.not.be.null;

      if (response.data.fieldData != null) {
        expect(response.data.fieldData.length).to.be.greaterThan(0);

        response.data.fieldData.forEach((field) => {
          expect(field.fieldId).to.not.be.null;
          expect(field).to.not.be.null;
          expect(field.type).to.not.be.null;
        });
      }
    }
  });

  it('should return a 401 error when an invalid API key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getRecordById(new GetRecordRequest(1, 1));

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when an invalid record id is used', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const response = await client.getRecordById(
      new GetRecordRequest(parseInt(process.env.TEST_SURVEY_ID), 0)
    );

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});
