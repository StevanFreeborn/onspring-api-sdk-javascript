import { OnspringClient } from '../src/models/OnspringClient';
import { ApiResponse } from '../src/models/ApiResponse';
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { expect } from 'chai';
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
import { ListItemRequest } from '../src/models/ListItemRequest';
import { ListItemResponse } from '../src/models/ListItemResponse';
import { Report } from '../src/models/Report';
import { GetPagedReportsResponse } from '../src/models/GetPagedReportsResponse';
import { ReportData } from '../src/models/ReportData';
import { GetRecordRequest } from '../src/models/GetRecordRequest';
import { Record } from '../src/models/Record';
import { RecordValue } from '../src/models/RecordValue';
import { GetRecordsByAppIdRequest } from '../src/models/GetRecordsByAppIdRequest';
import { GetPagedRecordsResponse } from '../src/models/GetPagedRecordsResponse';
import { GetRecordsRequest } from '../src/models/GetRecordsRequest';
import fs from 'fs';
import path from 'path';
import * as sinon from 'sinon';
import { QueryRecordsRequest } from '../src/models/QueryRecordsRequest';

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

  describe('deleteFileById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.deleteFileById).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.deleteFileById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).deleteFileById(1, 1, 1)
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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 204,
          statusText: 'No Content',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 204);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data', undefined);
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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 400,
          statusText: 'Bad Request',
          data: { field: ['Field requested is not a file type field.'] },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteFileById(1, 1, 1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 500);
      expect(result).to.have.property('isSuccessful', false);
      expect(result.message).to.be.undefined;
      expect(result.data).to.be.null;
    });
  });

  describe('addOrUpdateListItem', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.addOrUpdateListItem).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.addOrUpdateListItem).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).addOrUpdateListItem(
          new ListItemRequest(1, 'id', 'value', 1, 'color')
        )
      ).to.be.instanceOf(Promise);
    });

    it('should return a promise that resolves to an api response when request is successful at updating a list item', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'put').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.addOrUpdateListItem(
        new ListItemRequest(1, 'id', 'value', 1, 'color')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result.data).to.be.instanceOf(ListItemResponse);
      expect(result.data).to.have.property(
        'id',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      );
    });

    it('should return a promise that resolves to an api response when request is successful at adding a list item', async function () {
      const client = new OnspringClient(baseUrl, apiKey);

      const mockAxiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
          'x-apikey': apiKey,
          'x-api-version': '2',
        },
      });

      sinon.stub(mockAxiosClient, 'put').returns(
        Promise.resolve({
          status: 201,
          statusText: 'OK',
          data: { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.addOrUpdateListItem(
        new ListItemRequest(1, 'id', 'value', 1, 'color')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 201);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result.data).to.be.instanceOf(ListItemResponse);
      expect(result.data).to.have.property(
        'id',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      );
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

      sinon.stub(mockAxiosClient, 'put').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.addOrUpdateListItem(
        new ListItemRequest(1, 'id', 'value', 1, 'color')
      );

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

      sinon.stub(mockAxiosClient, 'put').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.addOrUpdateListItem(
        new ListItemRequest(1, 'id', 'value', 1, 'color')
      );

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

      sinon.stub(mockAxiosClient, 'put').returns(
        Promise.resolve({
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.addOrUpdateListItem(
        new ListItemRequest(1, 'id', 'value', 1, 'color')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
      expect(result.data).to.be.null;
    });
  });

  describe('deleteListItemById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.deleteListItemById).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.deleteListItemById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).deleteListItemById(1, 'id')
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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 204,
          statusText: 'OK',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteListItemById(1, 'id');

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 204);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data', undefined);
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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteListItemById(1, 'id');

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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 403,
          statusText: 'Forbidden',
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteListItemById(1, 'id');

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

      sinon.stub(mockAxiosClient, 'delete').returns(
        Promise.resolve({
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.deleteListItemById(1, 'id');

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
      expect(result.data).to.be.null;
    });
  });

  describe('getReportsByAppId', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getReportsByAppId).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getReportsByAppId).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getReportsByAppId(1)
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
            pageSize: 2,
            pageNumber: 1,
            totalRecords: 2,
            totalPages: 1,
            items: [
              {
                id: 1,
                appId: 1,
                name: 'Report 1',
                description: 'Report 1 Description',
              },
              {
                id: 1,
                appId: 1,
                name: 'Report 2',
                description: 'Report 2 Description',
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getReportsByAppId(1);

      expect(result).to.be.instanceOf(ApiResponse<GetPagedReportsResponse>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.not.be.null;
      expect(result.data).to.be.instanceOf(GetPagedReportsResponse);
      expect(result.data).to.have.property('pageSize', 2);
      expect(result.data).to.have.property('pageNumber', 1);
      expect(result.data).to.have.property('totalRecords', 2);
      expect(result.data).to.have.property('totalPages', 1);
      expect(result.data)
        .to.have.property('items')
        .that.is.an('array')
        .with.lengthOf(2);

      if (result.data != null) {
        result.data.items.forEach((item) => {
          expect(item).to.be.instanceOf(Report);
          expect(item).to.have.property('id');
          expect(item).to.have.property('appId');
          expect(item).to.have.property('name');
          expect(item).to.have.property('description');
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
          data: { message: 'Bad Request' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getReportsByAppId(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', '{"message":"Bad Request"}');
      expect(result).to.have.property('data', null);
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

      const result = await client.getReportsByAppId(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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

      const result = await client.getReportsByAppId(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
      expect(result).to.have.property('data', null);
    });
  });

  describe('getReportById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getReportById).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getReportById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getReportById(1)
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
            columns: ['field 1', 'field 2'],
            rows: [
              {
                recordId: 1,
                cells: ['field value 1', 'field value 2'],
              },
              {
                recordId: 2,
                cells: ['field value 1', 'field value 2'],
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getReportById(1);

      expect(result).to.be.instanceOf(ApiResponse<ReportData>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(ReportData);
      expect(result.data).to.have.property('columns').that.is.an('array');
      expect(result.data).to.have.property('rows').that.is.an('array');
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
          data: { message: 'Bad Request' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getReportById(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', '{"message":"Bad Request"}');
      expect(result).to.have.property('data', null);
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

      const result = await client.getReportById(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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

      const result = await client.getReportById(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
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
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getReportById(1);

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
      expect(result).to.have.property('data', null);
    });
  });

  describe('getRecordById', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getRecordById).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getRecordById).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getRecordById(
          new GetRecordRequest(1, 1)
        )
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
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'Text',
                fieldId: 1,
                value: 'Test',
              },
              {
                type: 'Text',
                fieldId: 2,
                value: 'Test',
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordById(new GetRecordRequest(1, 1));

      expect(result).to.be.instanceOf(ApiResponse<Record>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.instanceOf(Record);
      expect(result.data).to.have.property('appId', 1);
      expect(result.data).to.have.property('recordId', 1);
      expect(result.data).to.have.property('fieldData');

      if (result.data != null) {
        expect(result.data.fieldData).to.be.an('array').that.has.lengthOf(2);
        result.data.fieldData.forEach((recordValue) => {
          expect(recordValue).to.be.instanceOf(RecordValue);
          expect(recordValue).to.have.property('type');
          expect(recordValue).to.have.property('fieldId');
          expect(recordValue).to.have.property('value');
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

      sinon.stub(mockAxiosClient, 'get').returns(
        Promise.resolve({
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordById(new GetRecordRequest(1, 1));

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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

      const result = await client.getRecordById(new GetRecordRequest(1, 1));

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
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
          data: { message: 'Not Found' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordById(new GetRecordRequest(1, 1));

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 404);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Not Found');
      expect(result).to.have.property('data', null);
    });
  });

  describe('getRecordsByAppId', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getRecordsByAppId).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getRecordsByAppId).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getRecordsByAppId(
          new GetRecordsByAppIdRequest(1)
        )
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
            pageSize: 1,
            pageNumber: 1,
            totalPages: 1,
            totalRecords: 1,
            items: [
              {
                appId: 1,
                recordId: 1,
                fieldData: [
                  {
                    type: 'Text',
                    fieldId: 1,
                    value: 'Test',
                  },
                  {
                    type: 'Text',
                    fieldId: 2,
                    value: 'Test',
                  },
                ],
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordsByAppId(
        new GetRecordsByAppIdRequest(1)
      );

      expect(result).to.be.instanceOf(ApiResponse<GetPagedRecordsResponse>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');
      expect(result.data).to.be.an.instanceOf(GetPagedRecordsResponse);
      expect(result.data).to.not.be.null;

      if (result.data != null) {
        expect(result.data).to.have.property('pageSize', 1);
        expect(result.data).to.have.property('pageNumber', 1);
        expect(result.data).to.have.property('totalPages', 1);
        expect(result.data).to.have.property('totalRecords', 1);
        expect(result.data).to.have.property('items');
        expect(result.data.items).to.be.an('array').that.has.lengthOf(1);

        result.data.items.forEach((record) => {
          expect(record).to.be.instanceOf(Record);
          expect(record).to.have.property('appId', 1);
          expect(record).to.have.property('recordId', 1);
          expect(record).to.have.property('fieldData');
          expect(record.fieldData).to.not.be.null;

          if (record.fieldData != null) {
            expect(record.fieldData).to.be.an('array').that.has.lengthOf(2);

            record.fieldData.forEach((recordValue) => {
              expect(recordValue).to.be.instanceOf(RecordValue);
              expect(recordValue).to.have.property('type');
              expect(recordValue).to.have.property('fieldId');
              expect(recordValue).to.have.property('value');
            });
          }
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
          data: { message: 'Bad Request' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordsByAppId(
        new GetRecordsByAppIdRequest(1)
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', '{"message":"Bad Request"}');
      expect(result).to.have.property('data', null);
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

      const result = await client.getRecordsByAppId(
        new GetRecordsByAppIdRequest(1)
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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

      const result = await client.getRecordsByAppId(
        new GetRecordsByAppIdRequest(1)
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
      expect(result).to.have.property('data', null);
    });
  });

  describe('getRecordsByIds', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.getRecordsByIds).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.getRecordsByIds).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).getRecordsByIds(
          new GetRecordsRequest(1, [1, 2, 3])
        )
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

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            count: 1,
            items: [
              {
                appId: 1,
                recordId: 1,
                fieldData: [
                  {
                    type: 'text',
                    fieldId: 1,
                    value: 'Test',
                  },
                  {
                    type: 'text',
                    fieldId: 2,
                    value: 'Test',
                  },
                ],
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordsByIds(
        new GetRecordsRequest(1, [1, 2, 3])
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');

      if (result.data != null) {
        expect(result.data).to.have.property('items');
        expect(result.data.items).to.be.an('array').that.has.lengthOf(1);

        result.data.items.forEach((record) => {
          expect(record).to.be.instanceOf(Record);
          expect(record).to.have.property('appId', 1);
          expect(record).to.have.property('recordId', 1);
          expect(record).to.have.property('fieldData');
          expect(record.fieldData).to.not.be.null;

          if (record.fieldData != null) {
            expect(record.fieldData).to.be.an('array').that.has.lengthOf(2);

            record.fieldData.forEach((recordValue) => {
              expect(recordValue).to.be.instanceOf(RecordValue);
              expect(recordValue).to.have.property('type');
              expect(recordValue).to.have.property('fieldId');
              expect(recordValue).to.have.property('value');
            });
          }
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

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 400,
          statusText: 'Bad Request',
          data: { message: 'Bad Request' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordsByIds(
        new GetRecordsRequest(1, [1])
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', '{"message":"Bad Request"}');
      expect(result).to.have.property('data', null);
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

      const result = await client.getRecordsByIds(
        new GetRecordsRequest(1, [1])
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.getRecordsByIds(
        new GetRecordsRequest(1, [1])
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
      expect(result).to.have.property('data', null);
    });
  });

  describe('queryRecords', function () {
    it('should be defined', function () {
      expect(OnspringClient.prototype.queryRecords).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(OnspringClient.prototype.queryRecords).to.be.a('function');
    });

    it('should return a promise', function () {
      expect(
        new OnspringClient(baseUrl, apiKey).queryRecords(
          new QueryRecordsRequest(1, 'filter')
        )
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

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: {
            pageSize: 1,
            pageNumber: 1,
            totalRecords: 1,
            totalPages: 1,
            items: [
              {
                appId: 1,
                recordId: 1,
                fieldData: [
                  {
                    type: 'text',
                    fieldId: 1,
                    value: 'value',
                  },
                  {
                    type: 'text',
                    fieldId: 2,
                    value: 'value',
                  },
                ],
              },
            ],
          },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.queryRecords(
        new QueryRecordsRequest(1, 'filter')
      );

      expect(result).to.be.instanceOf(ApiResponse<GetPagedRecordsResponse>);
      expect(result).to.have.property('statusCode', 200);
      expect(result).to.have.property('isSuccessful', true);
      expect(result).to.have.property('message', '');
      expect(result).to.have.property('data');

      if (result.data != null) {
        expect(result.data).to.be.instanceOf(GetPagedRecordsResponse);
        expect(result.data).to.have.property('pageSize', 1);
        expect(result.data).to.have.property('pageNumber', 1);
        expect(result.data).to.have.property('totalRecords', 1);
        expect(result.data).to.have.property('totalPages', 1);
        expect(result.data).to.have.property('items');
        expect(result.data.items).to.not.be.null;

        if (result.data.items != null) {
          expect(result.data.items).to.be.an('array').that.has.lengthOf(1);

          result.data.items.forEach((record) => {
            expect(record).to.be.instanceOf(Record);
            expect(record).to.have.property('appId', 1);
            expect(record).to.have.property('recordId', 1);
            expect(record).to.have.property('fieldData');
            expect(record.fieldData).to.not.be.null;

            if (record.fieldData != null) {
              expect(record.fieldData).to.be.an('array').that.has.lengthOf(2);

              record.fieldData.forEach((recordValue) => {
                expect(recordValue).to.be.instanceOf(RecordValue);
                expect(recordValue).to.have.property('type');
                expect(recordValue).to.have.property('fieldId');
                expect(recordValue).to.have.property('value');
              });
            }
          });
        }
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

      sinon.stub(mockAxiosClient, 'post').returns(
        Promise.resolve({
          status: 400,
          statusText: 'Bad Request',
          data: { message: 'Bad Request' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.queryRecords(
        new QueryRecordsRequest(1, 'filter')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 400);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', '{"message":"Bad Request"}');
      expect(result).to.have.property('data', null);
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

      const result = await client.queryRecords(
        new QueryRecordsRequest(1, 'filter')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 401);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', undefined);
      expect(result).to.have.property('data', null);
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
          data: { message: 'Forbidden' },
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        } as AxiosResponse)
      );

      sinon.stub(client, '_client' as any).value(mockAxiosClient);

      const result = await client.queryRecords(
        new QueryRecordsRequest(1, 'filter')
      );

      expect(result).to.be.instanceOf(ApiResponse);
      expect(result).to.have.property('statusCode', 403);
      expect(result).to.have.property('isSuccessful', false);
      expect(result).to.have.property('message', 'Forbidden');
      expect(result).to.have.property('data', null);
    });
  });
});
