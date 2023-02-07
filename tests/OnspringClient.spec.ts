import { OnspringClient } from '../src/models/OnspringClient';
import { ApiResponse } from '../src/models/ApiResponse';
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { GetPagedAppsResponse } from '../src/models/GetPagedAppsResponse';
import { App } from '../src/models/App';
import { CollectionResponse } from '../src/models/CollectionResponse';
import { Field } from '../src/models/Field';
import { FieldStatus } from '../src/enums/FieldStatus';
import { FieldType } from '../src/enums/FieldType';
import { GetPagedFieldsResponse } from '../src/models/GetPagedFieldsResponse';
import { SaveFileRequest } from '../src/models/SaveFileRequest';
import { Readable } from 'stream';
import { CreatedWithIdResponse } from '../src/models/CreatedWithIdResponse';
import { FileInfo } from '../src/models/FileInfo';
import { File } from '../src/models/File';
import fs from 'fs';
import path from 'path';

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

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
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

      const result = await client.getAppById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
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
          status: 403,
          statusText: 'Forbidden',
          data: {
            message: 'Client does not have access to read app: 1',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        'Client does not have access to read app: 1'
      );
      expect(result).to.have.property('data', null);
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
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
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('getAppsByIds', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppsByIds).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppsByIds).to.be.a(
        'function'
      );
    });

    it('should have 1 parameter', function () {
      expect(new OnspringClient(baseUrl, apiKey).getAppsByIds).to.have.lengthOf(
        1
      );
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getAppsByIds([1, 2, 3])
      ).to.be.a('promise');
    });

    it('should return a promise that resolves to an api response of a collection of apps when request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            count: 2,
            items: [
              {
                href: 'https://api.onspring.dev/Apps/id/1',
                id: 1,
                name: 'Test App 1',
              },
              {
                href: 'https://api.onspring.dev/Apps/id/2',
                id: 2,
                name: 'Test App 2',
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse<CollectionResponse<App[]>>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      if (result.data != null) {
        expect(result.data).to.be.instanceOf(CollectionResponse);
        expect(result.data).to.have.property('count', 2);
        expect(result.data).to.have.property('items');
        if (result.data.items != null) {
          expect(result.data.items).to.be.an('array');
          expect(result.data.items).to.have.lengthOf(2);
          result.data.items.forEach((item) => {
            expect(item).to.be.instanceOf(App);
            expect(item).to.have.property('id');
            expect(item).to.have.property('name');
            expect(item).to.have.property('href');
          });
        }
      }
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: {
            message: 'Client does not have access to read app: 1, 2',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getAppsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        'Client does not have access to read app: 1, 2'
      );
      expect(result.data).to.be.null;
    });
  });

  describe('getFieldById', function () {
    it('should be defined', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldById).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldById).to.be.a(
        'function'
      );
    });

    it('should have 1 parameter', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldById).to.have.lengthOf(
        1
      );
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldById(1)).to.be.a(
        'promise'
      );
    });

    it('should return a promise that resolves to an api response of a field when request is successful', async function () {
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
            id: 1,
            appId: 1,
            name: 'Text Field',
            type: 'Text',
            status: 'Enabled',
            isRequired: false,
            isUnique: false,
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldById(1);
      expect(result).to.be.instanceOf(ApiResponse<Field>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      if (result.data != null) {
        expect(result.data).to.be.instanceOf(Field);
        expect(result.data).to.have.property('id', 1);
        expect(result.data).to.have.property('appId', 1);
        expect(result.data).to.have.property('name', 'Text Field');
        expect(result.data).to.have.property('type', FieldType.Text);
        expect(result.data).to.have.property('status', FieldStatus.Enabled);
        expect(result.data).to.have.property('isRequired', false);
        expect(result.data).to.have.property('isUnique', false);
      }
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
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

      const result = await client.getFieldById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
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
          status: 403,
          statusText: 'Forbidden',
          data: {
            message: 'Client does not have access to read field: 1',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        'Client does not have access to read field: 1'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
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
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldById(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('getFieldsByIds', function () {
    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldsByIds).to.be.a(
        'function'
      );
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldsByIds([1])).to.be.a(
        'promise'
      );
    });

    it('should return a promise that resolves to an api response of a collection of fields when request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            count: 2,
            items: [
              {
                id: 1,
                appId: 1,
                name: 'Text Field',
                type: 'Text',
                status: 'Enabled',
                isRequired: false,
                isUnique: false,
              },
              {
                id: 2,
                appId: 1,
                name: 'Number Field',
                type: 'Number',
                status: 'Enabled',
                isRequired: false,
                isUnique: false,
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse<CollectionResponse<Field>>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      if (result.data != null) {
        expect(result.data).to.be.instanceOf(CollectionResponse<Field>);
        expect(result.data).to.have.property('count', 2);
        expect(result.data).to.have.property('items');
        expect(result.data.items).to.have.lengthOf(2);
        result.data.items.forEach((item) => {
          expect(item).to.be.instanceOf(Field);
          expect(item).to.have.property('id');
          expect(item).to.have.property('appId');
          expect(item).to.have.property('name');
          expect(item).to.have.property('type');
          expect(item).to.have.property('status');
          expect(item).to.have.property('isRequired');
          expect(item).to.have.property('isUnique');
        });
      }
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: {
            message: 'Client does not have access to read field: 1,2',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        'Client does not have access to read field: 1,2'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByIds([1, 2]);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('getFieldsByAppId', function () {
    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldsByAppId).to.be.a(
        'function'
      );
    });

    it('should return a promise', function () {
      expect(new OnspringClient(baseUrl, apiKey).getFieldsByAppId(1)).to.be.a(
        'promise'
      );
    });

    it('should return a promise that resolves to an api response of a paged collection of fields when request is successful', async function () {
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
                id: 1,
                appId: 1,
                name: 'Text Field 1',
                type: 'Text',
                status: 'Enabled',
                isRequired: false,
                isUnique: false,
              },
              {
                id: 2,
                appId: 1,
                name: 'Number Field 2',
                type: 'Number',
                status: 'Enabled',
                isRequired: false,
                isUnique: false,
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByAppId(1);

      expect(result).to.be.instanceOf(ApiResponse<GetPagedFieldsResponse>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(GetPagedFieldsResponse);
      expect(result.data).to.have.property('pageNumber', 1);
      expect(result.data).to.have.property('pageSize', 2);
      expect(result.data).to.have.property('totalPages', 1);
      expect(result.data).to.have.property('totalRecords', 2);
      expect(result.data).to.have.property('items');

      if (result.data != null) {
        expect(result.data.items).to.be.an('array');
        expect(result.data.items).to.have.lengthOf(2);
        result.data.items.forEach((item) => {
          expect(item).to.be.instanceOf(Field);
          expect(item).to.have.property('id');
          expect(item).to.have.property('appId');
          expect(item).to.have.property('name');
          expect(item).to.have.property('type');
          expect(item).to.have.property('status');
          expect(item).to.have.property('isRequired');
          expect(item).to.have.property('isUnique');
        });
      }
    });

    it('should return a promise that resolves to an api response when request receives a 400 response', async function () {
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

      const result = await client.getFieldsByAppId(1);

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

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
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

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
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
          status: 403,
          statusText: 'Forbidden',
          data: {
            message: 'Client does not have access to read app: 1',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFieldsByAppId(1);
      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        'Client does not have access to read app: 1'
      );
      expect(result.data).to.be.null;
    });
  });

  describe('saveFile', function () {
    it('should be a function', function () {
      expect(new OnspringClient(baseUrl, apiKey).saveFile).to.be.a('function');
    });

    it('should return a promise', function () {
      const client = new OnspringClient(baseUrl, apiKey);
      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );
      expect(client.saveFile(saveFileRequest)).to.be.instanceOf(Promise);
    });

    it('should return a promise that resolves to an api response of with a created id when the request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 201,
          statusText: 'Created',
          data: {
            id: 1,
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 201);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(CreatedWithIdResponse);
      expect(result.data).to.have.property('id', 1);
    });

    it('should return a promise that resolves to an api response when request receives a 400 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 400,
          statusText: 'Bad Request',
          data: {
            File: ['The File field is required.'],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        '{"File":["The File field is required."]}'
      );
      expect(result).to.have.property('data');
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: {
            message:
              'The user does not have permission to access this resource.',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.equal(
        'The user does not have permission to access this resource.'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 404,
          statusText: 'Not Found',
          data: {
            message: 'The requested resource was not found.',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.equal('The requested resource was not found.');
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 500 response', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const saveFileRequest = new SaveFileRequest(
        1,
        1,
        'notes',
        new Date(),
        'file name',
        'content type',
        new Readable()
      );

      const result = await client.saveFile(saveFileRequest);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 500);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('getFileInfoById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getFileInfoById).to.be.not.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getFileInfoById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getFileInfoById(1, 1, 1)
      ).to.be.instanceOf(Promise);
    });

    it('should return a promise that resolves to an api response when request is successful', async function () {
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
            type: 'Attachment',
            contentType: 'string',
            name: 'string',
            createdDate: '2023-02-04T20:15:45.007Z',
            modifiedDate: '2023-02-04T20:15:45.007Z',
            owner: 'string',
            notes: 'string',
            fileHref: 'string',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileInfoById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse<FileInfo>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result.message).to.be.equal('');
      expect(result.data).to.be.not.null;
      expect(result.data).to.be.instanceOf(FileInfo);
      expect(result.data).to.have.property('type', 'Attachment');
      expect(result.data).to.have.property('contentType', 'string');
      expect(result.data).to.have.property('name', 'string');
      expect(result.data).to.have.property(
        'createdDate',
        '2023-02-04T20:15:45.007Z'
      );
      expect(result.data).to.have.property(
        'modifiedDate',
        '2023-02-04T20:15:45.007Z'
      );
      expect(result.data).to.have.property('owner', 'string');
      expect(result.data).to.have.property('notes', 'string');
      expect(result.data).to.have.property('fileHref', 'string');
    });

    it('should return a promise that resolves to an api response when request receives a 400 response', async function () {
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
            field: ['Field requested is not a file type field.'],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileInfoById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.equal(
        '{"field":["Field requested is not a file type field."]}'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
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

      const result = await client.getFileInfoById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
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
          status: 403,
          statusText: 'Forbidden',
          data: {
            message:
              'The user does not have permission to access this resource.',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileInfoById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.equal(
        'The user does not have permission to access this resource.'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
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
          status: 404,
          statusText: 'Not Found',
          data: {
            message: 'The requested resource was not found.',
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileInfoById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.equal('The requested resource was not found.');
      expect(result.data).to.be.null;
    });
  });

  describe('getFileById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getFileById).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getFileById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getFileById(1, 1, 1)
      ).to.be.instanceOf(Promise);
    });

    it('should return a promise that resolves to a file when request is successful', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      const filePath = path.join(__dirname, 'testData', 'test-attachment.txt');
      const file = fs.createReadStream(filePath);

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: file,
          headers: {
            'content-disposition': 'attachment; filename="test-attachment.txt"',
            'content-length': 14,
            'content-type': 'text/plain',
          },
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse<File>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result.data).to.be.instanceOf(File);
      expect(result.data).to.have.property('fileName', 'test-attachment.txt');
      expect(result.data).to.have.property('contentLength', 14);
      expect(result.data).to.have.property('contentType', 'text/plain');
      expect(result.data)
        .to.have.property('stream')
        .that.is.instanceOf(Readable);
    });

    it('should return a promise that resolves to an api response when request receives a 400 response', async function () {
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
          data: { field: ['Field requested is not a file type field.'] },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property(
        'message',
        '{"field":["Field requested is not a file type field."]}'
      );
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 401 response', async function () {
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

      const result = await client.getFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 403 response', async function () {
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
          status: 403,
          statusText: 'Forbidden',
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
      expect(result.data).to.be.null;
    });

    it('should return a promise that resolves to an api response when request receives a 404 response', async function () {
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
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
      expect(result.data).to.be.null;
    });
  });
});
