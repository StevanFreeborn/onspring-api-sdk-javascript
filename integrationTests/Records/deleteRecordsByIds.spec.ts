import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';
import { addRecord } from '../utils/addRecord';

describe('deleteRecordsByIds', function () {
  this.timeout(30000);
  this.retries(3);

  it('should delete records', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const recordId1 = await addRecord(baseURL, apiKey);
    const recordId2 = await addRecord(baseURL, apiKey);

    const response = await client.deleteRecordsByIds(
      parseInt(process.env.TEST_SURVEY_ID),
      [recordId1, recordId2]
    );

    expect(response.statusCode).to.equal(204);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;
  });

  it('should return a 400 error when no record ids are provided', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const response = await client.deleteRecordsByIds(
      parseInt(process.env.TEST_SURVEY_ID),
      []
    );

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error when an invalid API key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');

    const response = await client.deleteRecordsByIds(1, [1]);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when the API key does not have access to the app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const response = await client.deleteRecordsByIds(
      parseInt(process.env.TEST_APP_ID_NO_ACCESS),
      [1]
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
