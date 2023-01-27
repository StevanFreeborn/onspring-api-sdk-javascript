import { OnspringClient } from '../src/OnspringClient';
import { ApiResponse } from '../src/models/ApiResponse';
import { expect } from 'chai';
import * as sinon from 'sinon';

describe('OnspringClient', function () {
  const baseUrl = 'https://api.onspring.dev';
  const apiKey = 'apiKey';

  it('should be defined', function () {
    expect(OnspringClient).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(OnspringClient).to.have.property('constructor');
  });

  it('should have 2 parameters', function () {
    expect(OnspringClient).to.have.lengthOf(2);
  });

  it('should throw an error when the baseUrl is null', function () {
    expect(() => new OnspringClient(null, apiKey)).to.throw(
      'baseUrl must be an absolute and well-formed URI.'
    );
  });

  it('should throw an error when the baseUrl is undefined', function () {
    expect(() => new OnspringClient(undefined, apiKey)).to.throw(
      'baseUrl must be an absolute and well-formed URI.'
    );
  });

  it('should throw an error when the baseUrl is an empty string', function () {
    expect(() => new OnspringClient('', apiKey)).to.throw(
      'baseUrl must be an absolute and well-formed URI.'
    );
  });

  it('should throw an error when the baseUrl is a string with only spaces', function () {
    expect(() => new OnspringClient(' ', apiKey)).to.throw(
      'baseUrl must be an absolute and well-formed URI.'
    );
  });

  it('should throw an error when the baseUrl is not a valid url', function () {
    expect(() => new OnspringClient('api.onspring.com', apiKey)).to.throw(
      'baseUrl must be an absolute and well-formed URI.'
    );
  });

  it('should throw an error when the apiKey is null', function () {
    expect(() => new OnspringClient(baseUrl, null)).to.throw(
      'apiKey cannot be null/empty/whitespace.'
    );
  });

  it('should throw an error when the apiKey is undefined', function () {
    expect(() => new OnspringClient(baseUrl, undefined)).to.throw(
      'apiKey cannot be null/empty/whitespace.'
    );
  });

  it('should throw an error when the apiKey is an empty string', function () {
    expect(() => new OnspringClient(baseUrl, '')).to.throw(
      'apiKey cannot be null/empty/whitespace.'
    );
  });

  it('should throw an error when the apiKey is a string with only spaces', function () {
    expect(() => new OnspringClient(baseUrl, ' ')).to.throw(
      'apiKey cannot be null/empty/whitespace.'
    );
  });

  it('should not throw an error when the baseUrl is a valid url', function () {
    expect(() => new OnspringClient(baseUrl, apiKey)).to.not.throw();
  });

  it('should not throw an error when the baseUrl is a valid url', function () {
    expect(() => new OnspringClient('http://api.onspring.com', apiKey)).to.not.throw();
  });

  it('should not throw an error when the apiKey is a valid string', function () {
    expect(() => new OnspringClient(baseUrl, apiKey)).to.not.throw();
  });

  it('should have a client property', function () {
    expect(new OnspringClient(baseUrl, apiKey)).to.have.property('_client');
  });

  describe('canConnect', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.be.a('function');
    });

    it('should have 0 parameters', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.have.lengthOf(0);
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect()).to.be.a('promise');
    });

    it('should return a promise that resolves to a boolean', async function () {
      const client = new OnspringClient(baseUrl, apiKey);
      const result = await client.canConnect();
      expect(result).to.be.a('boolean');
    });

    it('should return a promise that resolves to true when able to connect to the Onspring API', async function () {
      const client = new OnspringClient(baseUrl, apiKey);
      sinon.stub(client, 'get' as any).returns(Promise.resolve(new ApiResponse(200, 'OK', null)));
      const result = await client.canConnect();
      expect(result).to.be.true;
    });

    it('should return a promise that resolves to false when unable to connect to the Onspring API', async function () {
      const client = new OnspringClient(baseUrl, apiKey);
      sinon.stub(client, 'get' as any).returns(Promise.resolve(new ApiResponse(500, 'Internal Server Error', null)));
      const result = await client.canConnect();
      expect(result).to.be.false;
    });
  });
});
