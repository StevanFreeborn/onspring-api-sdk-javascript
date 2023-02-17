import { ListItemRequest, OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('deleteListItemById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should delete a list item', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_ID === undefined) {
      expect.fail('TEST_LIST_ID is not defined');
    }

    const request = new ListItemRequest(
      parseInt(process.env.TEST_LIST_ID),
      null,
      `added_list_value_${new Date().getTime()}}`,
      1,
      '#000000'
    );

    const addListItemResponse = await client.addOrUpdateListItem(request);
    const listItemId = addListItemResponse.data?.id;

    if (listItemId === undefined) {
      expect.fail('listItemId is undefined');
    }

    const response = await client.deleteListItemById(
      parseInt(process.env.TEST_LIST_ID),
      listItemId
    );

    expect(response.statusCode).to.equal(204);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;
  });

  it('should return a 401 error when deleting a list item and the API key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.deleteListItemById(1, '1');

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when deleting a list item and the api key does not have access to update the list', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_LIST_ID_NO_ACCESS is not defined');
    }

    if (process.env.TEST_LIST_ITEM_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_LIST_ITEM_ID_NO_ACCESS is not defined');
    }

    const response = await client.deleteListItemById(
      parseInt(process.env.TEST_LIST_ID_NO_ACCESS),
      process.env.TEST_LIST_ITEM_ID_NO_ACCESS
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when deleting a list item and its list does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.deleteListItemById(
      0,
      '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    );

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when deleting a list item that does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_ID === undefined) {
      expect.fail('TEST_LIST_ID is not defined');
    }

    const response = await client.deleteListItemById(
      parseInt(process.env.TEST_LIST_ID),
      '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    );

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
