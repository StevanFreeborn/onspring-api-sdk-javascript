import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getReportsByAppId', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a list of reports', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const response = await client.getReportsByAppId(
      parseInt(process.env.TEST_SURVEY_ID)
    );

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.pageNumber).to.not.be.null;
      expect(response.data.pageSize).to.not.be.null;
      expect(response.data.totalRecords).to.not.be.null;
      expect(response.data.totalPages).to.not.be.null;
      expect(response.data.items).to.not.be.null;
      expect(response.data.items).to.be.an('array');

      response.data.items.forEach((report) => {
        expect(report.appId).to.not.be.null;
        expect(report.id).to.not.be.null;
        expect(report.name).to.not.be.null;
        expect(report.description).to.not.be.null;
      });
    }
  });

  it('should return a 400 error if page size is invalid', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_SURVEY_ID === undefined) {
      expect.fail('TEST_SURVEY_ID is not defined');
    }

    const response = await client.getReportsByAppId(
      parseInt(process.env.TEST_SURVEY_ID),
      { pageSize: 1001, pageNumber: 1 }
    );

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error if the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getReportsByAppId(1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error if the api key does not have access to one of the reports', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_APP_ID_NO_ACCESS === undefined) {
      expect.fail('TEST_APP_ID_NO_ACCESS is not defined');
    }

    const response = await client.getReportsByAppId(
      parseInt(process.env.TEST_APP_ID_NO_ACCESS)
    );

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.to.not.be.undefined;
    expect(response.data).to.be.null;
  });
});
