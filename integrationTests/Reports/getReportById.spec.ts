import { DataFormat, OnspringClient, ReportDataType } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getReportById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a report', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_REPORT === undefined) {
      expect.fail('TEST_REPORT is not defined');
    }

    const response = await client.getReportById(
      parseInt(process.env.TEST_REPORT)
    );

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.columns).to.not.be.null;
      expect(response.data.columns).to.be.an('array');
      expect(response.data.rows).to.not.be.null;
      expect(response.data.rows).to.be.an('array');

      response.data.rows.forEach((row) => {
        expect(row).to.not.be.null;
        expect(row.recordId).to.not.be.null;
        expect(row.cells).to.not.be.null;
        expect(row.cells).to.be.an('array');
      });
    }
  });

  it('should return report data for a report with chart data when report data is requested', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_REPORT_WITH_CHART_DATA === undefined) {
      expect.fail('TEST_REPORT_WITH_CHART_DATA is not defined');
    }

    const response = await client.getReportById(
      parseInt(process.env.TEST_REPORT_WITH_CHART_DATA)
    );

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.columns).to.not.be.null;
      expect(response.data.columns).to.be.an('array');
      expect(response.data.rows).to.not.be.null;
      expect(response.data.rows).to.be.an('array');

      response.data.rows.forEach((row) => {
        expect(row).to.not.be.null;
        expect(row.recordId).to.not.be.null;
        expect(row.cells).to.not.be.null;
        expect(row.cells).to.be.an('array');
      });
    }
  });

  it('should return chart data for a report with a chart when chart data is requested', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_REPORT_WITH_CHART_DATA === undefined) {
      expect.fail('TEST_REPORT_WITH_CHART_DATA is not defined');
    }

    const response = await client.getReportById(
      parseInt(process.env.TEST_REPORT_WITH_CHART_DATA),
      DataFormat.Raw,
      ReportDataType.ChartData
    );

    expect(response.statusCode).to.equal(200);
    expect(response.isSuccessful).to.be.true;
    expect(response.message).to.equal('');
    expect(response.data).to.not.be.null;

    if (response.data != null) {
      expect(response.data.columns).to.not.be.null;
      expect(response.data.columns).to.be.an('array');
      expect(response.data.rows).to.not.be.null;
      expect(response.data.rows).to.be.an('array');

      response.data.rows.forEach((row) => {
        expect(row).to.not.be.null;
        expect(row.recordId).to.not.be.null;
        expect(row.cells).to.not.be.null;
        expect(row.cells).to.be.an('array');
      });
    }
  });

  it('should return a 400 error if chart data is requested for a report without chart data', async function () {
    const client = new OnspringClient(baseURL, apiKey);

    if (process.env.TEST_REPORT === undefined) {
      expect.fail('TEST_REPORT is not defined');
    }

    const response = await client.getReportById(
      parseInt(process.env.TEST_REPORT),
      DataFormat.Raw,
      ReportDataType.ChartData
    );

    expect(response.statusCode).to.equal(400);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 401 error if the api key is invalid', async function () {
    const client = new OnspringClient(baseURL, 'invalid');
    const response = await client.getReportById(1);

    expect(response.statusCode).to.equal(401);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 403 error if the api key does not have access to the report', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getReportById(1);

    expect(response.statusCode).to.equal(403);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.not.be.null.and.not.be.undefined;
    expect(response.data).to.be.null;
  });

  it('should return a 404 error if the report does not exist', async function () {
    const client = new OnspringClient(baseURL, apiKey);
    const response = await client.getReportById(0);

    expect(response.statusCode).to.equal(404);
    expect(response.isSuccessful).to.be.false;
    expect(response.message).to.be.undefined;
    expect(response.data).to.be.null;
  });
});
