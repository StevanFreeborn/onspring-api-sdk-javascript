import { OnspringClient, GetRecordsRequest, DataFormat } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getRecordsByIds', function () {
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
    const recordId = parseInt(process.env.TEST_SURVEY_RECORD_ID);
    const request = new GetRecordsRequest(appId, [recordId]);
    const response = await client.getRecordsByIds(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.count).to.not.be.null;
      expect(response.data.items.length).to.be.greaterThan(0);

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

  it('should get records when field ids and data format are passed as parameters', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_SURVEY_RECORD_ID === undefined) {
      expect.fail('TEST_SURVEY_RECORD_ID is not defined');
    }

    if (process.env.TEST_TEXT_FIELD === undefined) {
      expect.fail('TEST_TEXT_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const recordId = parseInt(process.env.TEST_SURVEY_RECORD_ID);
    const textFieldId = parseInt(process.env.TEST_TEXT_FIELD);
    const request = new GetRecordsRequest(
      appId,
      [recordId],
      [textFieldId],
      DataFormat.Formatted
    );
    const response = await client.getRecordsByIds(request);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.count).to.not.be.null;
      expect(response.data.items.length).to.be.greaterThan(0);

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

  it('should return a 400 error if too many record ids are passed', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const recordIds = new Array(101).fill(1);
    const request = new GetRecordsRequest(1, recordIds);
    const response = await client.getRecordsByIds(request);

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error if the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const request = new GetRecordsRequest(1, [1]);
    const response = await client.getRecordsByIds(request);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error if the user does not have access to the app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const appId = parseInt(process.env.TEST_APP_ID_NO_ACCESS);
    const request = new GetRecordsRequest(appId, [1]);
    const response = await client.getRecordsByIds(request);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
