import { getClient } from '../mochaRootHooks';
import { expect } from 'chai';

describe('canConnect', function () {
  this.timeout(30000);
  this.retries(3);

  it('should be able to connect to the API', async function () {
    const client = getClient();
    const response = await client.canConnect();
    expect(response).to.be.true;
  });
});
