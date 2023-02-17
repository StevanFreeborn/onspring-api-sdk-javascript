import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getAppsByIds', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a collection of apps', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const appIds = process.env.TEST_APP_IDS;

    if (appIds === undefined) {
      return expect.fail('TEST_APP_IDS is not defined');
    }

    const appIdsAsNumbers = appIds.split(',').map((id) => parseInt(id));
    const response = await client.getAppsByIds(appIdsAsNumbers);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.items).to.not.be.null;
      expect(response.data.items)
        .to.be.an('array')
        .that.has.lengthOf(appIdsAsNumbers.length);

      response.data.items.forEach((item) => {
        expect(item.id).to.not.be.null;
        expect(item.name).to.not.be.null;
        expect(item.href).to.not.be.null;
      });
    }
  });

  it('should return a 401 error when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getAppsByIds([1]);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when api key does not have access to any of the requested app', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const appIds = process.env.TEST_APP_IDS_NO_ACCESS;

    if (appIds === undefined) {
      return expect.fail('TEST_APP_IDS_NO_ACCESS is not defined');
    }

    const appIdsAsNumbers = appIds.split(',').map((id) => parseInt(id));
    const response = await client.getAppsByIds(appIdsAsNumbers);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.undefined.and.not.be.null;
    expect(response.data).to.be.null;
  });
});
