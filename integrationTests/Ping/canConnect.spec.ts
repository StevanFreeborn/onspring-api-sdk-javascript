import { OnspringClient } from '../../src';
import { expect } from 'chai';

describe('canConnect', function () {
  this.timeout(30000);
  this.retries(3);

  it('should be able to connect to the API', async function () {
    const client = new OnspringClient(
      process.env.API_BASE_URL!,
      process.env.SANDBOX_API_KEY!
    );
    const response = await client.canConnect();
    expect(response).to.be.true;
  });
});
