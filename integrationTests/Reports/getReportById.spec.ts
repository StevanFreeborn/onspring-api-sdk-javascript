import { OnspringClient } from './../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getReportById', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a report', async function () {});

  it('should return report data for a report with chart data when report data is requested', async function () {});

  it('should return chart data for a report with a chart when chart data is requested', async function () {});

  it('should return a 400 error if chart data is requested for a report without chart data', async function () {});

  it('should return a 401 error if the api key is invalid', async function () {});

  it('should return a 403 error if the api key does not have access to the report', async function () {});

  it('should return a 404 error if the report does not exist', async function () {});
});
