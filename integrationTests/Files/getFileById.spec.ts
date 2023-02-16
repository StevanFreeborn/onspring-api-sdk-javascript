import { OnspringClient } from '../../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getFileById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a file in an attachment field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_ATTACHMENT_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD is not defined');
    }

    if (process.env.TEST_ATTACHMENT === undefined) {
      expect.fail('TEST_ATTACHMENT is not defined');
    }

    const recordId = parseInt(process.env.TEST_RECORD);
    const fieldId = parseInt(process.env.TEST_ATTACHMENT_FIELD);
    const fileId = parseInt(process.env.TEST_ATTACHMENT);

    const response = await client.getFileById(recordId, fieldId, fileId);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.contentLength).to.not.be.null;
      expect(response.data.contentType).to.not.be.null;
      expect(response.data.fileName).to.not.be.null;
      expect(response.data.stream).to.not.be.null;
    }
  });

  it('should return a file in an image field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_IMAGE_FIELD === undefined) {
      expect.fail('TEST_IMAGE_FIELD is not defined');
    }

    if (process.env.TEST_IMAGE === undefined) {
      expect.fail('TEST_IMAGE is not defined');
    }

    const recordId = parseInt(process.env.TEST_RECORD);
    const fieldId = parseInt(process.env.TEST_IMAGE_FIELD);
    const fileId = parseInt(process.env.TEST_IMAGE);
    const response = await client.getFileById(recordId, fieldId, fileId);

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.contentLength).to.not.be.null;
      expect(response.data.contentType).to.not.be.null;
      expect(response.data.fileName).to.not.be.null;
      expect(response.data.stream).to.not.be.null;
    }
  });

  it('should return a 400 response when fieldId is not for a file field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_TEXT_FIELD === undefined) {
      expect.fail('TEST_TEXT_FIELD is not defined');
    }

    if (process.env.TEST_ATTACHMENT === undefined) {
      expect.fail('TEST_ATTACHMENT is not defined');
    }

    const recordId = parseInt(process.env.TEST_RECORD);
    const fieldId = parseInt(process.env.TEST_TEXT_FIELD);
    const fileId = parseInt(process.env.TEST_ATTACHMENT);
    const response = await client.getFileById(recordId, fieldId, fileId);

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 response when the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_ATTACHMENT_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD is not defined');
    }

    if (process.env.TEST_ATTACHMENT === undefined) {
      expect.fail('TEST_ATTACHMENT is not defined');
    }

    const recordId = parseInt(process.env.TEST_RECORD);
    const fieldId = parseInt(process.env.TEST_ATTACHMENT_FIELD);
    const fileId = parseInt(process.env.TEST_ATTACHMENT);
    const response = await client.getFileById(recordId, fieldId, fileId);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when the api key does not have access to the file field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD is not defined');
    }

    const fieldId = parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD);
    const response = await client.getFileById(1, fieldId, 1);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when the api key does not have access to the app where the file is held', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_APP === undefined) {
      expect.fail('EST_ATTACHMENT_FIELD_NO_ACCESS_APP is not defined');
    }

    const fieldId = parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_APP);
    const response = await client.getFileById(1, fieldId, 1);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 response when the file field cannot be found', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getFileById(1, 0, 1);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 response when the file record cannot be found', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_ATTACHMENT_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD is not defined');
    }

    const fieldId = parseInt(process.env.TEST_ATTACHMENT_FIELD);
    const response = await client.getFileById(0, fieldId, 1);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
