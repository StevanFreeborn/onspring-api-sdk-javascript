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

  // it('should return a 401 error when an invalid api key is used', async function () {});

  // it('should return a 403 error when api key does not have access to the list', async function () {});

  // it('should return a 404 error when the list does not exist', async function () {});

  // it('should return a 404 error when the list item does not exist', async function () {});
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
