import { type RootHookObject, type Context } from 'mocha';
import { expect } from 'chai';
import * as dotenv from 'dotenv';
dotenv.config();

let baseURL: string | undefined;
let apiKey: string | undefined;

export const mochaHooks = (): RootHookObject => {
  return {
    beforeAll(this: Context) {
      baseURL = process.env.API_BASE_URL;
      apiKey = process.env.SANDBOX_API_KEY;

      if (baseURL === undefined) {
        return expect.fail('API_BASE_URL is not defined');
      }

      if (apiKey === undefined) {
        return expect.fail('SANDBOX_API_KEY is not defined');
      }
    },
  };
};

export { baseURL, apiKey };
