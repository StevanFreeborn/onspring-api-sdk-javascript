import { type RootHookObject, type Context } from 'mocha';
import { expect } from 'chai';

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
