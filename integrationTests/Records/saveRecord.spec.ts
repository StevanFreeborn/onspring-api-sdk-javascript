import { StringRecordValue } from './../../src/models/StringRecordValue';
import { OnspringClient, Record } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('saveRecord', function () {
  this.timeout(30000);
  this.retries(3);

  const newRecords: any[] = [];

  after(async function () {
    for (const record of newRecords) {
      await deleteRecord(record.appId, record.recordId);
    }
  });

  it('should add a record when no record id is passed', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_TEXT_FIELD === undefined) {
      expect.fail('TEST_TEXT_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const fieldId = parseInt(process.env.TEST_TEXT_FIELD);
    const record = new Record(appId, null, [
      new StringRecordValue(fieldId, 'Test'),
    ]);

    const response = await client.saveRecord(record);
    expect(response.statusCode).to.equal(201);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.not.be.null;
      expect(response.data.warnings).to.not.be.null;

      newRecords.push({
        appId,
        recordId: response.data.id,
      });
    }
  });

  it('should update a record when a record id is passed', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    if (process.env.TEST_TEXT_FIELD === undefined) {
      expect.fail('TEST_TEXT_FIELD is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const fieldId = parseInt(process.env.TEST_TEXT_FIELD);
    const newRecord = new Record(appId, null, [
      new StringRecordValue(fieldId, 'Test'),
    ]);

    const newRecordResponse = await client.saveRecord(newRecord);
    const newRecordId = newRecordResponse.data?.id;

    if (newRecordId === undefined) {
      expect.fail('newRecordId is undefined');
    }

    newRecords.push({
      appId,
      recordId: newRecordId,
    });

    const record = new Record(appId, newRecordId, [
      new StringRecordValue(fieldId, 'updated'),
    ]);

    const response = await client.saveRecord(record);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.not.be.null;
      expect(response.data.warnings).to.not.be.null;

      newRecords.push({
        appId,
        recordId: response.data.id,
      });
    }
  });

  it('should return a 400 error when field data is empty', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const record = new Record(appId, null, []);
    const response = await client.saveRecord(record);

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error when the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.saveRecord(new Record(0, null, []));

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

    const appId = parseInt(process.env.TEST_APP_ID_NO_ACCESS);
    const response = await client.saveRecord(new Record(appId, null, []));

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when the record id is not found', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_SURVEY_ID);
    const record = new Record(appId, 0, []);
    const response = await client.saveRecord(record);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});

async function deleteRecord(appId: number, recordId: number): Promise<void> {
  const client = new OnspringClient(baseURL, apiKey);
  await client.deleteRecordById(appId, recordId);
}
