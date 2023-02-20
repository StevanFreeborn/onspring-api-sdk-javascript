import { StringRecordValue } from './../../src/models/StringRecordValue';
import { OnspringClient, Record } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('deleteRecordById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should delete a record', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const recordId = await addRecord();
    const response = await client.deleteRecordById(
      parseInt(process.env.TEST_SURVEY_ID),
      recordId
    );

    expect(response.statusCode).to.equal(204);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;
  });

  it('should return a 401 error when the API key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.deleteRecordById(1, 1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when the API key does not have access to the record', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const response = await client.deleteRecordById(
      parseInt(process.env.TEST_APP_ID_NO_ACCESS),
      1
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when the record does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID === undefined) {
      expect.fail('TEST_APP_ID is not defined');
    }

    const response = await client.deleteRecordById(
      parseInt(process.env.TEST_APP_ID),
      0
    );

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});

async function addRecord(): Promise<number> {
  const client = new OnspringClient(baseURL, apiKey);

  if (process.env.TEST_SURVEY_ID === undefined) {
    expect.fail('TEST_SURVEY_ID is not defined');
  }

  if (process.env.TEST_TEXT_FIELD === undefined) {
    expect.fail('TEST_TEXT_FIELD is not defined');
  }

  const request = new Record(parseInt(process.env.TEST_SURVEY_ID), null);

  request.addValue(
    new StringRecordValue(parseInt(process.env.TEST_TEXT_FIELD), 'test')
  );

  const response = await client.saveRecord(request);

  if (response.data === null || response.data.id === undefined) {
    expect.fail('Record ID is not defined');
  }

  return response.data.id;
}
