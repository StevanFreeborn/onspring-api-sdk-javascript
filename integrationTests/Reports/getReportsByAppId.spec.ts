import { OnspringClient } from '../../src';
import { expect } from 'chai';
import { baseURL, apiKey } from '../mochaRootHooks';

describe('getReportsByAppId', function () {
  this.timeout(30000);
  this.retries(3);

  it('should return a list of reports', async function () {});

  it('should return a 400 error if page size is invalid', async function () {});

  it('should return a 401 error if the api key is invalid', async function () {});

  it('should return a 403 error if the api key does not have access to one of the reports', async function () {});
});
