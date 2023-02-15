import { OnspringClient } from '../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from './mochaRootHooks';

describe('getFieldsByIds', function () {
  it('should return a collection of fields', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_FIELD_IDS === undefined) {
      return expect.fail('TEST_FIELD_IDS is not defined');
    }

    const fieldIds = process.env.TEST_FIELD_IDS.split(',').map((id) => {
      return parseInt(id);
    });

    const response = await client.getFieldsByIds(fieldIds);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.count).to.equal(fieldIds.length);
      expect(response.data.items.length).to.equal(fieldIds.length);
      response.data.items.forEach((item) => {
        expect(item.id).to.not.be.null;
        expect(item.name).to.not.be.null;
        expect(item.appId).to.not.be.null;
        expect(item.type).to.not.be.null;
        expect(item.status).to.not.be.null;
        expect(item.isRequired).to.not.be.null;
        expect(item.isUnique).to.not.be.null;
      });
    }
  });

  it('should return a 401 response when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getFieldsByIds([1, 2, 3]);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when the api key does not have access to any of the requested fields', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_FIELD_IDS_NO_ACCESS === undefined) {
      return expect.fail('TEST_FIELD_IDS_NO_ACCESS is not defined');
    }

    const fieldIds = process.env.TEST_FIELD_IDS_NO_ACCESS.split(',').map(
      (id) => {
        return parseInt(id);
      }
    );

    const response = await client.getFieldsByIds(fieldIds);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
