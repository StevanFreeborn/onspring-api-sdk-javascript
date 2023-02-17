import { OnspringClient, SaveFileRequest } from '../../src/index';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';
import fs from 'fs';
import path from 'path';

describe('deleteFileById', function () {
  this.timeout(30000);
  this.retries(3);

  let attachmentFileId: number;
  let imageFileId: number;

  before(async function () {
    attachmentFileId = await addAttachmentFile();
    imageFileId = await addImageFile();
  });

  it('should delete a file from an attachment field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_ATTACHMENT_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD is not defined');
    }

    const response = await client.deleteFileById(
      parseInt(process.env.TEST_RECORD),
      parseInt(process.env.TEST_ATTACHMENT_FIELD),
      attachmentFileId
    );

    expect(response.statusCode).to.equal(204);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.equal('');
  });

  it('should delete a file from an image field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_IMAGE_FIELD === undefined) {
      expect.fail('TEST_IMAGE_FIELD is not defined');
    }

    const response = await client.deleteFileById(
      parseInt(process.env.TEST_RECORD),
      parseInt(process.env.TEST_IMAGE_FIELD),
      imageFileId
    );

    expect(response.statusCode).to.equal(204);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.equal('');
  });

  it('should return a 400 response when fieldId is not for a file field', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_RECORD === undefined) {
      expect.fail('TEST_RECORD is not defined');
    }

    if (process.env.TEST_TEXT_FIELD === undefined) {
      expect.fail('TEST_TEXT_FIELD is not defined');
    }

    const response = await client.deleteFileById(
      parseInt(process.env.TEST_RECORD),
      parseInt(process.env.TEST_TEXT_FIELD),
      attachmentFileId
    );

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 response when the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.deleteFileById(1, 1, 1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when the api key does not have access to the field where the file is held', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD is not defined');
    }

    const response = await client.deleteFileById(
      1,
      parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD),
      1
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 response when the api key does not have access to the app where the file is held', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_APP === undefined) {
      expect.fail('TEST_ATTACHMENT_FIELD_NO_ACCESS_APP is not defined');
    }

    const response = await client.deleteFileById(
      1,
      parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_APP),
      1
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 response when the file field cannot be found', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.deleteFileById(1, 0, 1);

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

    const response = await client.deleteFileById(
      0,
      parseInt(process.env.TEST_ATTACHMENT_FIELD),
      1
    );

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });
});

async function addAttachmentFile(): Promise<number> {
  const client = new OnspringClient(baseURL, apiKey);

  if (process.env.TEST_RECORD === undefined) {
    expect.fail('TEST_RECORD is not defined');
  }

  if (process.env.TEST_ATTACHMENT_FIELD === undefined) {
    expect.fail('TEST_ATTACHMENT_FIELD is not defined');
  }

  const currentDirectory = __dirname;
  const parentDirectory = path.resolve(currentDirectory, '..');
  const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
  const fileStream = fs.createReadStream(filePath);
  const request = new SaveFileRequest(
    parseInt(process.env.TEST_RECORD),
    parseInt(process.env.TEST_ATTACHMENT_FIELD),
    'notes',
    new Date(),
    'test-attachment.txt',
    'text/plain',
    fileStream
  );

  const response = await client.saveFile(request);
  return response.data?.id ?? 0;
}

async function addImageFile(): Promise<number> {
  const client = new OnspringClient(baseURL, apiKey);

  if (process.env.TEST_RECORD === undefined) {
    expect.fail('TEST_RECORD is not defined');
  }

  if (process.env.TEST_IMAGE_FIELD === undefined) {
    expect.fail('TEST_IMAGE_FIELD is not defined');
  }

  const currentDirectory = __dirname;
  const parentDirectory = path.resolve(currentDirectory, '..');
  const filePath = path.join(parentDirectory, 'testData/test-image.jpeg');
  const fileStream = fs.createReadStream(filePath);
  const request = new SaveFileRequest(
    parseInt(process.env.TEST_RECORD),
    parseInt(process.env.TEST_IMAGE_FIELD),
    'notes',
    new Date(),
    'test-image.jpeg',
    'image/jpeg',
    fileStream
  );

  const response = await client.saveFile(request);
  return response.data?.id ?? 0;
}
