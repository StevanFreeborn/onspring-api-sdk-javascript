import { type RootHookObject, type Context } from 'mocha';
import { expect } from 'chai';
import http from 'http';
import https from 'https';
import { OnspringClient } from '../src';

const httpAgent = new http.Agent({ keepAlive: false });
const httpsAgent = new https.Agent({ keepAlive: false });

export const mochaHooks = (): RootHookObject => {
  return {
    beforeAll(this: Context) {
      if (process.env.API_BASE_URL === undefined) {
        return expect.fail('API_BASE_URL is not defined');
      }

      if (process.env.SANDBOX_API_KEY === undefined) {
        return expect.fail('SANDBOX_API_KEY is not defined');
      }
    },
  };
};

export function getClient(apiKey?: string): OnspringClient {
  return new OnspringClient(
    process.env.API_BASE_URL!,
    apiKey ?? process.env.SANDBOX_API_KEY!,
    { httpAgent, httpsAgent }
  );
}
