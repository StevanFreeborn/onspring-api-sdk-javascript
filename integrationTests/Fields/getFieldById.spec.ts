import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getAppById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_FIELD_ID === undefined) {
      return expect.fail('TEST_FIELD_ID is not defined');
    }

    const fieldId = parseInt(process.env.TEST_FIELD_ID);
    const response = await client.getFieldById(fieldId);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.equal(fieldId);
      expect(response.data.name).to.not.be.null;
      expect(response.data.appId).to.not.be.null;
      expect(response.data.type).to.not.be.null;
      expect(response.data.status).to.not.be.null;
      expect(response.data.isRequired).to.not.be.null;
      expect(response.data.isUnique).to.not.be.null;
    }
  });

  it('should return a 401 error when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getFieldById(1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when api key does not have access to the requested field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_FIELD_ID_NO_ACCESS === undefined) {
      return expect.fail('TEST_FIELD_ID_NO_ACCESS is not defined');
    }

    const fieldId = parseInt(process.env.TEST_FIELD_ID_NO_ACCESS);
    const response = await client.getFieldById(fieldId);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when the requested field does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getFieldById(0);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});
