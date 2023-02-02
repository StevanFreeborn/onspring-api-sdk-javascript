import { OnspringClient } from '../src/models/OnspringClient';
import { ApiResponse } from '../src/models/ApiResponse';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { GetPagedAppsResponse } from '../src/models/GetPagedAppsResponse';
import { App } from '../src/models/App';

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
    expect(
      () => new OnspringClient('http://api.onspring.com', apiKey)
    ).to.not.throw();
  });

  it('should not throw an error when the apiKey is a valid string', function () {
    expect(() => new OnspringClient(baseUrl, apiKey)).to.not.throw();
  });

  it('should create a new instance of an onspring client with proper properties', function () {
    expect(new OnspringClient(baseUrl, apiKey)).to.have.property('_client');
  });

  describe('canConnect', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.be.a(
        'function'
      );
    });

    it('should have 0 parameters', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect).to.have.lengthOf(
        0
      );
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).canConnect()).to.be.a(
        'promise'
      );
    });

    it('should return a promise that resolves to a boolean', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: null,
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.canConnect();
      expect(result).to.be.a('boolean');
    });

    it('should return a promise that resolves to true when able to connect to the Onspring API', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: null,
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.canConnect();
      expect(result).to.be.true;
    });

    it('should return a promise that resolves to false when unable to connect to the Onspring API', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 500,
          statusText: 'Internal Server Error',
          data: null,
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.canConnect();
      expect(result).to.be.false;
    });
  });

  describe('getApps', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).getApps).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getApps).to.be.a('function');
    });

    it('should have 0 parameters', function () {
      expect(new OnspringClient(baseUrl, apiKey).getApps).to.have.lengthOf(0);
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).getApps()).to.be.a('promise');
    });

    it('should return a promise that resolves to a paged response of apps when request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            pageNumber: 1,
            pageSize: 2,
            totalPages: 1,
            totalRecords: 2,
            items: [
              {
                href: 'https://api.onspring.dev/Apps/id/1',
                id: '1',
                name: 'Test App 1',
              },
              {
                href: 'https://api.onspring.dev/Apps/id/2',
                id: '2',
                name: 'Test App 2',
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getApps();
      expect(result).to.be.instanceOf(ApiResponse<GetPagedAppsResponse>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(GetPagedAppsResponse);
      expect(result.data).to.have.property('pageNumber', 1);
      expect(result.data).to.have.property('pageSize', 2);
      expect(result.data).to.have.property('totalPages', 1);
      expect(result.data).to.have.property('totalRecords', 2);
      expect(result.data).to.have.property('items');
      expect(result.data).to.not.be.null;
      if (result.data != null) {
        expect(result.data.items).to.be.instanceOf(Array);
        expect(result.data.items).to.have.lengthOf(2);
        expect(result.data.items[0]).to.be.instanceOf(App);
        expect(result.data.items[1]).to.be.instanceOf(App);
      }
    });

    it('should return a promise that resolves to an api response when request returns a 400 status code', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 400,
          statusText: 'Bad Request',
          data: {
            PageSize: ['The field PageSize must be between 0 and 1000.'],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getApps();

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        '{"PageSize":["The field PageSize must be between 0 and 1000."]}'
      );
      expect(result).to.have.property('data');
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request returns a 401 status code', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getApps();

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('getAppById', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppById).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppById).to.be.a(
        'function'
      );
    });

    it('should have 1 parameter', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppById).to.have.lengthOf(
        1
      );
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppById(1)).to.be.a(
        'promise'
      );
    });

    it('should return a promise that resolves to an api response of an app when request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            href: 'https://api.onspring.dev/Apps/id/1',
            id: 1,
            name: 'Test App 1',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppById(1);
      expect(result).to.be.instanceOf(ApiResponse<App>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(App);
      expect(result.data).to.have.property('id', 1);
      expect(result.data).to.have.property('name', 'Test App 1');
    });

    // TODO: Add test cases for 401, 403, and 404 status codes
  });
});
