import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { addRecord } from '../utils/addRecord';

describe('deleteRecordById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should delete a record', async function () {
    const client = new OnspringClient(
      process.env.API_BASE_URL!,
      process.env.SANDBOX_API_KEY!
    );

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const recordId = await addRecord(
      process.env.API_BASE_URL!,
      process.env.SANDBOX_API_KEY!
    );
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
    const client = new OnspringClient(process.env.API_BASE_URL!, 'invalid');
    const response = await client.deleteRecordById(1, 1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when the API key does not have access to the record', async function () {
    const client = new OnspringClient(
      process.env.API_BASE_URL!,
      process.env.SANDBOX_API_KEY!
    );

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
    const client = new OnspringClient(
      process.env.API_BASE_URL!,
      process.env.SANDBOX_API_KEY!
    );

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
