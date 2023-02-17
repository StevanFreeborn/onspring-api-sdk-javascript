import { OnspringClient, SaveFileRequest } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';
import fs from 'fs';
import path from 'path';

describe('saveFile', function () {
  this.timeout(30000);
  this.retries(3);

  // Delete any files that were created during the test
  const newFileIds: number[] = [];

  after(async function () {
    for (const newFileId of newFileIds) {
      await deleteFile(newFileId);
    }
  });

  it('should save a file into an attachment field', async function () {
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

    expect(response.statusCode).to.equal(201);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.not.be.null;
      newFileIds.push(response.data.id);
    }
  });

  it('should save a file into an image field', async function () {
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

    expect(response.statusCode).to.equal(201);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.id).to.not.be.null;
      newFileIds.push(response.data.id);
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

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      parseInt(process.env.TEST_RECORD),
      parseInt(process.env.TEST_TEXT_FIELD),
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 response when the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      1,
      1,
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

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

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      1,
      parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_FIELD),
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

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

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      1,
      parseInt(process.env.TEST_ATTACHMENT_FIELD_NO_ACCESS_APP),
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 response when the file field cannot be found', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      1,
      0,
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

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

    const currentDirectory = __dirname;
    const parentDirectory = path.resolve(currentDirectory, '..');
    const filePath = path.join(parentDirectory, 'testData/test-attachment.txt');
    const fileStream = fs.createReadStream(filePath);

    const request = new SaveFileRequest(
      0,
      parseInt(process.env.TEST_ATTACHMENT_FIELD),
      'notes',
      new Date(),
      'test-attachment.txt',
      'text/plain',
      fileStream
    );

    const response = await client.saveFile(request);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });
});

async function deleteFile(newFileId: number): Promise<void> {
  const client = new OnspringClient(baseURL, apiKey);

  if (
    process.env.TEST_RECORD === undefined ||
    process.env.TEST_ATTACHMENT_FIELD === undefined
  ) {
    return;
  }

  await client.deleteFileById(
    parseInt(process.env.TEST_RECORD),
    parseInt(process.env.TEST_ATTACHMENT_FIELD),
    newFileId
  );
}
