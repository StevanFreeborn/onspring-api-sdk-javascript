import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { getBaseUrl, getApiKey } from '../mochaRootHooks';

describe('canConnect', function () {
  this.timeout(30000);
  this.retries(3);

  it('should be able to connect to the API', async function () {
    const client = new OnspringClient(getBaseUrl(), getApiKey());
    const response = await client.canConnect();
    expect(response).to.be.true;
  });
});
