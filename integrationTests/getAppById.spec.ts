import { OnspringClient } from '../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from './mochaRootHooks';

describe('getAppById', function () {
  it('should return an app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID === undefined) {
      return expect.fail('TEST_APP_ID is not defined');
    }

    const appId = parseInt(process.env.TEST_APP_ID);
    const response = await client.getAppById(appId);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.equal(appId);
      expect(response.data.name).to.not.be.null;
      expect(response.data.href).to.not.be.null;
    }
  });

  it('should return a 401 error when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getAppById(1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when api key does not have access to the requested app', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      return expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const appId = parseInt(process.env.TEST_APP_ID_NO_ACCESS);
    const response = await client.getAppById(appId);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when an app id cannot be found', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getAppById(0);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});
