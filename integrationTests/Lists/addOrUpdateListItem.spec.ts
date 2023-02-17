import { ListItemRequest } from './../../src';
import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('addOrUpdateListItem', function () {
  this.timeout(30000);
  this.retries(3);

  const newListItemIds: string[] = [];

  // Delete the list items that were created during the test
  after(async function () {
    for (const id of newListItemIds) {
      await deleteListItem(id);
    }
  });

  it('should add a list item', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_FIELD === undefined) {
      expect.fail('TEST_LIST_FIELD is not defined');
    }

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

    const response = await client.addOrUpdateListItem(request);

    expect(response.statusCode).to.equal(201);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.not.be.null;
      newListItemIds.push(response.data.id);
    }
  });

  it('should update a list item', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_FIELD === undefined) {
      expect.fail('TEST_LIST_FIELD is not defined');
    }

    if (process.env.TEST_LIST_ID === undefined) {
      expect.fail('TEST_LIST_ID is not defined');
    }

    const request = new ListItemRequest(
      parseInt(process.env.TEST_LIST_ID),
      null,
      `added_list_value_${new Date().getTime()}}`,
      null,
      null
    );

    const response = await client.addOrUpdateListItem(request);
    const listItemId = response.data?.id;

    if (listItemId == null) {
      expect.fail('new listItemId is null');
    }

    newListItemIds.push(listItemId);

    const updateRequest = new ListItemRequest(
      parseInt(process.env.TEST_LIST_ID),
      listItemId,
      `updated_list_value_${new Date().getTime()}}`,
      1,
      '#000000'
    );

    const updateResponse = await client.addOrUpdateListItem(updateRequest);

    expect(updateResponse.statusCode).to.equal(200);
    expect(updateResponse.isSuccessful).to.be.true;
    expect(updateResponse.message).to.equal('');
    expect(updateResponse.data).to.not.be.null;
  });

  it('should return a 401 error when an invalid api key is used', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const request = new ListItemRequest(1, null, 'test', 1, '#000000');
    const response = await client.addOrUpdateListItem(request);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error when api key does not have access to the list', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const request = new ListItemRequest(1, null, 'test', 1, '#000000');
    const response = await client.addOrUpdateListItem(request);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when the list does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const request = new ListItemRequest(0, null, 'test', 1, '#000000');
    const response = await client.addOrUpdateListItem(request);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error when the list item does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_LIST_ID === undefined) {
      expect.fail('TEST_LIST_ID is not defined');
    }

    const request = new ListItemRequest(
      parseInt(process.env.TEST_LIST_ID),
      '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'test',
      1,
      '#000000'
    );

    const response = await client.addOrUpdateListItem(request);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });
});

async function deleteListItem(listItemIds: string): Promise<void> {
  const client = new OnspringClient(baseURL, apiKey);

  if (process.env.TEST_LIST_ID === undefined) {
    return;
  }

  await client.deleteListItemById(
    parseInt(process.env.TEST_LIST_ID),
    listItemIds
  );
}
