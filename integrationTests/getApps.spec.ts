import { OnspringClient } from '../src/index';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
import path from 'path';
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

describe('getApps', function () {
  const baseURL = 'https://api.onspring.com';
  let apiKey;

  before(function () {
    apiKey = process.env.SANDBOX_API_KEY;
  });

  it('should return a list of apps', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getApps();

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.items).to.not.be.null;

      if (response.data.items != null) {
        expect(response.data.items.length).to.be.greaterThan(0);
        response.data.items.forEach((item) => {
          expect(item.id).to.not.be.null;
          expect(item.name).to.not.be.null;
          expect(item.href).to.not.be.null;
        });
      }
    }
  });
});
