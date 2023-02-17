import { OnspringClient } from '../../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('canConnect', function () {
  this.timeout(30000);
  this.retries(3);

  it('should be able to connect to the API', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.canConnect();
    expect(response).to.be.true;
  });
});
