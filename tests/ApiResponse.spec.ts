import { ApiResponse } from '../src/models/ApiResponse';
import { expect } from 'chai';
import { GetPagedAppsResponse } from '../src/models/GetPagedAppsResponse';
import { App } from '../src/models/App';
import { CollectionResponse } from '../src/models/CollectionResponse';
import { Field } from '../src/models/Field';
import { FieldStatus } from '../src/enums/FieldStatus';
import { FieldType } from '../src/enums/FieldType';
import { GetPagedFieldsResponse } from '../src/models/GetPagedFieldsResponse';
import { CreatedWithIdResponse } from '../src/models/CreatedWithIdResponse';
import { FormulaField } from '../src/models/FormulaField';
import { FormulaOutputType } from '../src/enums/FormulaOutputType';
import { ListValue } from '../src/models/ListValue';
import { ReferenceField } from '../src/models/ReferenceField';
import { Multiplicity } from '../src/enums/Multiplicity';
import { ListField } from '../src/models/ListField';
import { File } from '../src/models/File';
import { ListItemResponse } from '../src/models/ListItemResponse';
import { GetPagedReportsResponse } from '../src/models/GetPagedReportsResponse';
import { Report } from '../src/models/Report';
import { ReportData } from '../src/models/ReportData';
import { Row } from '../src/models/Row';
import { Record } from '../src/models/Record';
import { RecordValue } from '../src/models/RecordValue';
import { GetPagedRecordsResponse } from '../src/models/GetPagedRecordsResponse';
import { testFieldData } from './testData/testFieldData';
import { type AxiosResponse } from 'axios';
import path from 'path';
import fs from 'fs';
import { SaveRecordResponse } from '../src/models/SaveRecordResponse';

describe('ApiResponse', function () {
  it('should be defined', function () {
    expect(ApiResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(ApiResponse).to.have.property('constructor');
  });

  it('should have 3 parameters', function () {
    expect(ApiResponse).to.have.lengthOf(3);
  });

  it('should create a new instance of the ApiResponse class', function () {
    expect(() => new ApiResponse(200, 'a message', 'some data')).to.not.throw();
  });

  it('should have a property named statusCode', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property(
      'statusCode'
    );
  });

  it('should have a property named isSuccessful', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property(
      'isSuccessful'
    );
  });

  it('should have a property named message', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property(
      'message'
    );
  });

  it('should have a property named data', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property(
      'data'
    );
  });

  it('should set the statusCode property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').statusCode).to.equal(
      200
    );
  });

  it('should set the isSuccessful property to true when the statusCode is less than 400', function () {
    expect(new ApiResponse(200, 'a message', 'some data').isSuccessful).to.be
      .true;
  });

  it('should set the isSuccessful property to false when the statusCode is greater than or equal to 400', function () {
    expect(new ApiResponse(400, 'a message', 'some data').isSuccessful).to.be
      .false;
  });

  it('should set the message property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').message).to.equal(
      'a message'
    );
  });

  it('should set the data property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').data).to.equal(
      'some data'
    );
  });

  describe('asGetPagedAppsResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asGetPagedAppsResponseType).to.not.be
        .undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asGetPagedAppsResponseType).to.have.lengthOf(
        0
      );
    });

    it('should return an ApiResponse<GetPagedAppsResponse> when data contains app items', function () {
      const mockResponseData = {
        pageNumber: 1,
        pageSize: 2,
        totalPages: 1,
        totalRecords: 2,
        items: [
          {
            href: 'https://api.onspring.dev/apps/id/1',
            id: 1,
            name: 'Test App',
          },
          {
            href: 'https://api.onspring.dev/apps/id/1',
            id: 2,
            name: 'Test App',
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const appsPagedResponse = apiResponse.asGetPagedAppsResponseType();

      expect(appsPagedResponse).to.be.instanceOf(ApiResponse);
      expect(appsPagedResponse.data).to.be.instanceOf(GetPagedAppsResponse);
      expect(appsPagedResponse.data).to.not.be.null;
      expect(appsPagedResponse.data).to.have.property('totalPages', 1);
      expect(appsPagedResponse.data).to.have.property('totalRecords', 2);
      expect(appsPagedResponse.data).to.have.property('pageNumber', 1);
      expect(appsPagedResponse.data).to.have.property('pageSize', 2);
      expect(appsPagedResponse.data)
        .to.have.property('items')
        .that.is.an.instanceOf(Array)
        .and.has.lengthOf(2);
      if (appsPagedResponse.data != null) {
        expect(appsPagedResponse.data.items[0]).to.be.instanceOf(App);
        expect(appsPagedResponse.data.items[1]).to.be.instanceOf(App);
      }
    });

    it('should return an ApiResponse<GetPagedAppsResponse> when data contains no app items', function () {
      const mockResponseData = {
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalRecords: 0,
        items: [],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const appsPagedResponse = apiResponse.asGetPagedAppsResponseType();

      expect(appsPagedResponse).to.be.instanceOf(ApiResponse);
      expect(appsPagedResponse.data).to.be.instanceOf(GetPagedAppsResponse);
      expect(appsPagedResponse.data).to.not.be.null;
      expect(appsPagedResponse.data).to.have.property('totalPages', 0);
      expect(appsPagedResponse.data).to.have.property('totalRecords', 0);
      expect(appsPagedResponse.data).to.have.property('pageNumber', 0);
      expect(appsPagedResponse.data).to.have.property('pageSize', 0);
      expect(appsPagedResponse.data)
        .to.have.property('items')
        .that.is.an.instanceOf(Array)
        .and.has.lengthOf(0);
      if (appsPagedResponse.data != null) {
        appsPagedResponse.data.items.forEach((item) => {
          expect(item).to.be.instanceOf(App);
          expect(item).to.have.property('id');
          expect(item).to.have.property('name');
          expect(item).to.have.property('href');
        });
      }
    });
  });

  describe('asAppType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asAppType).to.not.be.undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asAppType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<App> when data contain an app', function () {
      const mockResponseData = {
        href: 'https://api.onspring.dev/apps/id/1',
        id: 1,
        name: 'Test App',
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const appResponse = apiResponse.asAppType();

      expect(appResponse).to.be.instanceOf(ApiResponse);
      expect(appResponse.data).to.be.instanceOf(App);
      expect(appResponse.data).to.not.be.null;
      expect(appResponse.data).to.have.property('id', 1);
      expect(appResponse.data).to.have.property('name', 'Test App');
      expect(appResponse.data).to.have.property(
        'href',
        'https://api.onspring.dev/apps/id/1'
      );
    });
  });

  describe('asAppCollectionType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asAppCollectionType).to.not.be.undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asAppCollectionType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<CollectionResponse<App[]>> when data contains app items', function () {
      const mockResponseData = {
        count: 2,
        items: [
          {
            href: 'https://api.onspring.dev/apps/id/1',
            id: 1,
            name: 'Test App 1',
          },
          {
            href: 'https://api.onspring.dev/apps/id/2',
            id: 2,
            name: 'Test App 2',
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const appCollectionResponse = apiResponse.asAppCollectionType();

      expect(appCollectionResponse).to.be.instanceOf(
        ApiResponse<CollectionResponse<App>>
      );
      expect(appCollectionResponse.data).to.be.instanceOf(
        CollectionResponse<App>
      );
      expect(appCollectionResponse.data).to.not.be.null;
      expect(appCollectionResponse.data).to.have.property('count', 2);
      expect(appCollectionResponse.data)
        .to.have.property('items')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(2);
      if (appCollectionResponse.data != null) {
        appCollectionResponse.data.items.forEach((item) => {
          expect(item).to.be.instanceOf(App);
          expect(item).to.have.property('id');
          expect(item).to.have.property('name');
          expect(item).to.have.property('href');
        });
      }
    });
  });

  describe('asFieldType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asFieldType).to.not.be.undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asFieldType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<Field> when data contains a field', function () {
      const mockResponseData = {
        id: 1,
        appId: 1,
        name: 'Text Field',
        type: 'Text',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldResponse = apiResponse.asFieldType();

      expect(fieldResponse).to.be.instanceOf(ApiResponse);
      expect(fieldResponse.data).to.be.instanceOf(Field);
      expect(fieldResponse.data).to.not.be.null;
      expect(fieldResponse.data).to.have.property('id', 1);
      expect(fieldResponse.data).to.have.property('appId', 1);
      expect(fieldResponse.data).to.have.property('name', 'Text Field');
      expect(fieldResponse.data).to.have.property('type', FieldType.Text);
      expect(fieldResponse.data).to.have.property(
        'status',
        FieldStatus.Enabled
      );
      expect(fieldResponse.data).to.have.property('isRequired', false);
      expect(fieldResponse.data).to.have.property('isUnique', false);
    });

    it('should return an ApiResponse<Field> when data contains a list field', function () {
      const mockResponseData = {
        multiplicity: 'SingleSelect',
        listId: 1581,
        values: [
          {
            id: 'e4ee09cf-f93c-40c8-89a4-070514acb25b',
            name: 'List Value 1',
            sortOrder: 1,
            numericValue: 1,
            color: '#ffffff',
          },
          {
            id: 'a44fbfb0-6fa9-4d9d-912a-b1807bb1693c',
            name: 'List Value 2',
            sortOrder: 2,
            numericValue: 2,
            color: '#ffffff',
          },
          {
            id: '27021e2c-b27a-4fab-84f6-570a5a83a1cd',
            name: 'List Value 3',
            sortOrder: 3,
            numericValue: 3,
            color: '#ffffff',
          },
        ],
        id: 11929,
        appId: 373,
        name: 'single-select list field',
        type: 'List',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldResponse = apiResponse.asFieldType();

      expect(fieldResponse).to.be.instanceOf(ApiResponse<Field>);
      expect(fieldResponse.data).to.be.instanceOf(Field);
      expect(fieldResponse.data).to.be.instanceOf(ListField);
      expect(fieldResponse.data).to.not.be.null;
      expect(fieldResponse.data).to.be.instanceOf(ListField);
      expect(fieldResponse.data).to.have.property('id', 11929);
      expect(fieldResponse.data).to.have.property('appId', 373);
      expect(fieldResponse.data).to.have.property(
        'name',
        'single-select list field'
      );
      expect(fieldResponse.data).to.have.property('type', FieldType.List);
      expect(fieldResponse.data).to.have.property(
        'status',
        FieldStatus.Enabled
      );
      expect(fieldResponse.data).to.have.property('isRequired', false);
      expect(fieldResponse.data).to.have.property('isUnique', false);
      expect(fieldResponse.data).to.have.property(
        'multiplicity',
        Multiplicity.SingleSelect
      );
      expect(fieldResponse.data).to.have.property('listId', 1581);
      expect(fieldResponse.data)
        .to.have.property('values')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(3);

      if (fieldResponse.data != null) {
        const listField = fieldResponse.data as ListField;
        listField.values.forEach((value) => {
          expect(value).to.be.instanceOf(ListValue);
          expect(value).to.have.property('id');
          expect(value).to.have.property('name');
          expect(value).to.have.property('sortOrder');
          expect(value).to.have.property('numericValue');
          expect(value).to.have.property('color');
        });
      }
    });

    it('should return an ApiResponse<Field> when data contains a reference field', function () {
      const mockResponseData = {
        multiplicity: 'SingleSelect',
        referencedAppId: 2,
        id: 11866,
        appId: 373,
        name: 'Created By',
        type: 'Reference',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldResponse = apiResponse.asFieldType();

      expect(fieldResponse).to.be.instanceOf(ApiResponse<Field>);
      expect(fieldResponse.data).to.be.instanceOf(Field);
      expect(fieldResponse.data).to.be.instanceOf(ReferenceField);
      expect(fieldResponse.data).to.not.be.null;
      expect(fieldResponse.data).to.be.instanceOf(ReferenceField);
      expect(fieldResponse.data).to.have.property('id', 11866);
      expect(fieldResponse.data).to.have.property('appId', 373);
      expect(fieldResponse.data).to.have.property('name', 'Created By');
      expect(fieldResponse.data).to.have.property('type', FieldType.Reference);
      expect(fieldResponse.data).to.have.property(
        'status',
        FieldStatus.Enabled
      );
      expect(fieldResponse.data).to.have.property('isRequired', false);
      expect(fieldResponse.data).to.have.property('isUnique', false);
      expect(fieldResponse.data).to.have.property(
        'multiplicity',
        Multiplicity.SingleSelect
      );
      expect(fieldResponse.data).to.have.property('referencedAppId', 2);
    });

    it('should return an ApiResponse<Field> when data contains a list formula field', function () {
      const mockResponseData = {
        outputType: 'ListValue',
        values: [
          {
            id: '2dcc75c2-cd96-4bbc-babb-be78fb465e02',
            name: 'List Value 1',
            sortOrder: 1,
            numericValue: 1,
            color: '#d64646',
          },
          {
            id: '1f537f54-bf27-446b-a6a5-76aad5d3b5f6',
            name: 'List Value 2',
            sortOrder: 2,
            numericValue: 1,
            color: '#d64646',
          },
        ],
        id: 12680,
        appId: 373,
        name: 'List Formula Field',
        type: 'Formula',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldResponse = apiResponse.asFieldType();

      expect(fieldResponse).to.be.instanceOf(ApiResponse<Field>);
      expect(fieldResponse.data).to.be.instanceOf(Field);
      expect(fieldResponse.data).to.be.instanceOf(FormulaField);
      expect(fieldResponse.data).to.not.be.null;
      expect(fieldResponse.data).to.be.instanceOf(FormulaField);
      expect(fieldResponse.data).to.have.property('id', 12680);
      expect(fieldResponse.data).to.have.property('appId', 373);
      expect(fieldResponse.data).to.have.property('name', 'List Formula Field');
      expect(fieldResponse.data).to.have.property('type', FieldType.Formula);
      expect(fieldResponse.data).to.have.property(
        'status',
        FieldStatus.Enabled
      );
      expect(fieldResponse.data).to.have.property('isRequired', false);
      expect(fieldResponse.data).to.have.property('isUnique', false);
      expect(fieldResponse.data).to.have.property(
        'outputType',
        FormulaOutputType.ListValue
      );
      expect(fieldResponse.data)
        .to.have.property('values')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(2);

      if (fieldResponse.data != null) {
        const formulaField = fieldResponse.data as FormulaField;
        formulaField.values.forEach((value) => {
          expect(value).to.be.instanceOf(ListValue);
          expect(value).to.have.property('id');
          expect(value).to.have.property('name');
          expect(value).to.have.property('sortOrder');
          expect(value).to.have.property('numericValue');
          expect(value).to.have.property('color');
        });
      }
    });

    it('should return an ApiResponse<Field> when data contains a text formula field', function () {
      const mockResponseData = {
        outputType: 'Text',
        values: [],
        id: 12060,
        appId: 373,
        name: 'GetWeekOfYear',
        type: 'Formula',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldResponse = apiResponse.asFieldType();

      expect(fieldResponse).to.be.instanceOf(ApiResponse<Field>);
      expect(fieldResponse.data).to.be.instanceOf(Field);
      expect(fieldResponse.data).to.be.instanceOf(FormulaField);
      expect(fieldResponse.data).to.not.be.null;
      expect(fieldResponse.data).to.be.instanceOf(FormulaField);
      expect(fieldResponse.data).to.have.property('id', 12060);
      expect(fieldResponse.data).to.have.property('appId', 373);
      expect(fieldResponse.data).to.have.property('name', 'GetWeekOfYear');
      expect(fieldResponse.data).to.have.property('type', FieldType.Formula);
      expect(fieldResponse.data).to.have.property(
        'status',
        FieldStatus.Enabled
      );
      expect(fieldResponse.data).to.have.property('isRequired', false);
      expect(fieldResponse.data).to.have.property('isUnique', false);
      expect(fieldResponse.data).to.have.property(
        'outputType',
        FormulaOutputType.Text
      );
      expect(fieldResponse.data)
        .to.have.property('values')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(0);
    });

    it('should throw an error when data contains an unknown field type', function () {
      const mockResponseData = {
        id: 1,
        appId: 1,
        name: 'Unknown Field',
        type: 'Unknown',
        status: 'Enabled',
        isRequired: false,
        isUnique: false,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      expect(() => apiResponse.asFieldType()).to.throw();
    });
  });

  describe('asFieldCollectionType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asFieldCollectionType).to.not.be.undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asFieldCollectionType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<CollectionResponse<Field>> when data contains field items', function () {
      const mockResponseData = {
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
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fieldCollectionResponse = apiResponse.asFieldCollectionType();

      expect(fieldCollectionResponse).to.be.instanceOf(
        ApiResponse<CollectionResponse<Field>>
      );
      expect(fieldCollectionResponse.data).to.be.instanceOf(
        CollectionResponse<Field>
      );
      expect(fieldCollectionResponse.data).to.not.be.null;
      expect(fieldCollectionResponse.data).to.have.property('count', 2);
      expect(fieldCollectionResponse.data)
        .to.have.property('items')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(2);

      if (fieldCollectionResponse.data != null) {
        fieldCollectionResponse.data.items.forEach((item) => {
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

    it('should throw an error when data contains an unknown field type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            id: 1,
            appId: 1,
            name: 'Unknown Field',
            type: 'Unknown',
            status: 'Enabled',
            isRequired: false,
            isUnique: false,
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      expect(() => apiResponse.asFieldCollectionType()).to.throw();
    });
  });

  describe('asGetPagedFieldsResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asGetPagedFieldsResponseType).to.not.be
        .undefined;
    });

    it('should have no parameters', function () {
      expect(
        ApiResponse.prototype.asGetPagedFieldsResponseType
      ).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<GetPagedFieldsResponse> when data contains field items', function () {
      const mockResponseData = {
        pageNumber: 1,
        pageSize: 2,
        totalPages: 1,
        totalRecords: 2,
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
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const getPagedFieldsResponse = apiResponse.asGetPagedFieldsResponseType();

      expect(getPagedFieldsResponse).to.be.instanceOf(
        ApiResponse<GetPagedFieldsResponse>
      );
      expect(getPagedFieldsResponse.data).to.be.instanceOf(
        GetPagedFieldsResponse
      );
      expect(getPagedFieldsResponse.data).to.not.be.null;
      expect(getPagedFieldsResponse.data).to.have.property('pageNumber', 1);
      expect(getPagedFieldsResponse.data).to.have.property('pageSize', 2);
      expect(getPagedFieldsResponse.data).to.have.property('totalPages', 1);
      expect(getPagedFieldsResponse.data).to.have.property('totalRecords', 2);
      expect(getPagedFieldsResponse.data)
        .to.have.property('items')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(2);

      if (getPagedFieldsResponse.data != null) {
        getPagedFieldsResponse.data.items.forEach((item) => {
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

    it('should return an ApiResponse<GetPagedFieldsResponse> when data contains no field items', function () {
      const mockResponseData = {
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalRecords: 0,
        items: [],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const getPagedFieldsResponse = apiResponse.asGetPagedFieldsResponseType();

      expect(getPagedFieldsResponse).to.be.instanceOf(
        ApiResponse<GetPagedFieldsResponse>
      );
      expect(getPagedFieldsResponse.data).to.be.instanceOf(
        GetPagedFieldsResponse
      );
      expect(getPagedFieldsResponse.data).to.not.be.null;
      expect(getPagedFieldsResponse.data).to.have.property('pageNumber', 0);
      expect(getPagedFieldsResponse.data).to.have.property('pageSize', 0);
      expect(getPagedFieldsResponse.data).to.have.property('totalPages', 0);
      expect(getPagedFieldsResponse.data).to.have.property('totalRecords', 0);
      expect(getPagedFieldsResponse.data)
        .to.have.property('items')
        .that.is.instanceOf(Array)
        .and.has.lengthOf(0);
    });

    it('should throw an error when data contains an unknown field type', function () {
      const mockResponseData = {
        pageNumber: 1,
        pageSize: 1,
        totalPages: 1,
        totalRecords: 1,
        items: [
          {
            id: 1,
            appId: 1,
            name: 'Unknown Field',
            type: 'Unknown',
            status: 'Enabled',
            isRequired: false,
            isUnique: false,
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      expect(() => apiResponse.asGetPagedFieldsResponseType()).to.throw();
    });
  });

  describe('asCreatedWithIdResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asCreatedWithIdResponseType).to.not.be
        .undefined;
    });

    it('should have no parameters', function () {
      expect(
        ApiResponse.prototype.asCreatedWithIdResponseType
      ).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<CreatedWithIdResponse> when data contains an id', function () {
      const mockResponseData = {
        id: 1,
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const createdWithIdResponse = apiResponse.asCreatedWithIdResponseType();

      expect(createdWithIdResponse).to.be.instanceOf(
        ApiResponse<CreatedWithIdResponse>
      );
      expect(createdWithIdResponse.data).to.be.instanceOf(
        CreatedWithIdResponse
      );
      expect(createdWithIdResponse.data).to.not.be.null;
      expect(createdWithIdResponse.data).to.have.property('id', 1);
    });
  });

  describe('asFileType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asFileType).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asFileType).to.be.a('function');
    });

    it('should have 1 parameter', function () {
      expect(ApiResponse.prototype.asFileType).to.have.lengthOf(1);
    });

    it('should return an ApiResponse<File> when data contains an attachment file', function () {
      const mockResponse = {
        headers: {
          'content-type': 'text/plain',
          'content-disposition': 'attachment; filename="test-attachment.txt"',
          'Content-Length': '13',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-attachment.txt'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse).to.be.instanceOf(ApiResponse<File>);
      expect(fileResponse.data).to.be.instanceOf(File);
      expect(fileResponse.data).to.not.be.null;
      expect(fileResponse.data).to.have.property(
        'fileName',
        'test-attachment.txt'
      );
      expect(fileResponse.data).to.have.property('contentLength', 13);
      expect(fileResponse.data).to.have.property('contentType', 'text/plain');
      expect(fileResponse.data).to.have.property('stream', mockResponseData);
    });

    it('should return an ApiResponse<File> when data contains an image file', function () {
      const mockResponse = {
        headers: {
          'content-type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'Content-Length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse).to.be.instanceOf(ApiResponse<File>);
      expect(fileResponse.data).to.be.instanceOf(File);
      expect(fileResponse.data).to.not.be.null;
      expect(fileResponse.data).to.have.property('fileName', 'test-image.jpeg');
      expect(fileResponse.data).to.have.property('contentLength', 98897);
      expect(fileResponse.data).to.have.property('contentType', 'image/jpeg');
      expect(fileResponse.data).to.have.property('stream', mockResponseData);
    });

    it('should return an ApiResponse<file> with proper contentType value when header is Content-Type', function () {
      const mockResponse = {
        headers: {
          'Content-Type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'Content-Length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentType', 'image/jpeg');
    });

    it('should return an ApiResponse<file> with proper contentType value when header is content-type', function () {
      const mockResponse = {
        headers: {
          'content-type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'Content-Length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentType', 'image/jpeg');
    });

    it('should return an ApiResponse<file> with proper contentType value when no content-type header is present', function () {
      const mockResponse = {
        headers: {
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'Content-Length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentType', null);
    });

    it('should return an ApiResponse<file> with proper contentLength value when header is Content-Length', function () {
      const mockResponse = {
        headers: {
          'Content-Type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'Content-Length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentLength', 98897);
    });

    it('should return an ApiResponse<file> with proper contentLength value when header is content-length', function () {
      const mockResponse = {
        headers: {
          'Content-Type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
          'content-length': '98897',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentLength', 98897);
    });

    it('should return an ApiResponse<file> with proper contentLength value when no content-length header is present', function () {
      const mockResponse = {
        headers: {
          'Content-Type': 'image/jpeg',
          'content-disposition': 'attachment; filename="test-image.jpeg"',
        } as AxiosResponse['headers'],
      } as AxiosResponse;

      const attachmentPath = path.join(
        __dirname,
        'testData',
        'test-image.jpeg'
      );
      const mockResponseData = fs.createReadStream(attachmentPath);
      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const fileResponse = apiResponse.asFileType(mockResponse);

      expect(fileResponse.data).to.have.property('contentLength', 0);
    });
  });

  describe('asListItemResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asListItemResponseType).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asListItemResponseType).to.be.a('function');
    });
    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asListItemResponseType.length).to.equal(0);
    });
    it('should return an ApiResponse<ListItemResponse>', function () {
      const apiResponse = new ApiResponse(200, 'OK', {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      });
      const listItemResponse = apiResponse.asListItemResponseType();
      expect(listItemResponse).to.be.an.instanceof(ApiResponse);
      expect(listItemResponse.data).to.be.an.instanceof(ListItemResponse);
      expect(listItemResponse.data).to.have.property(
        'id',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      );
    });
  });

  describe('asGetPagedReportsResponse', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asGetPagedReportsResponseType).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asGetPagedReportsResponseType).to.be.a(
        'function'
      );
    });

    it('should have no parameters', function () {
      expect(
        ApiResponse.prototype.asGetPagedReportsResponseType.length
      ).to.equal(0);
    });

    it('should return an ApiResponse<GetPagedReportsResponse>', function () {
      const mockResponseData = {
        pageSize: 2,
        pageNumber: 1,
        totalRecords: 2,
        totalPages: 1,
        items: [
          {
            appId: 1,
            id: 1,
            name: 'string',
            description: 'description',
          },
          {
            appId: 2,
            id: 2,
            name: 'string',
            description: 'description',
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const getPagedReportsResponse =
        apiResponse.asGetPagedReportsResponseType();

      expect(getPagedReportsResponse).to.be.an.instanceof(
        ApiResponse<GetPagedReportsResponse>
      );
      expect(getPagedReportsResponse.data).to.be.an.instanceof(
        GetPagedReportsResponse
      );
      expect(getPagedReportsResponse.data).to.have.property('pageSize', 2);
      expect(getPagedReportsResponse.data).to.have.property('pageNumber', 1);
      expect(getPagedReportsResponse.data).to.have.property('totalRecords', 2);
      expect(getPagedReportsResponse.data).to.have.property('totalPages', 1);

      expect(getPagedReportsResponse.data)
        .to.have.property('items')
        .to.be.an('array')
        .that.has.lengthOf(2);

      expect(getPagedReportsResponse.data).to.not.be.null;

      if (getPagedReportsResponse.data != null) {
        getPagedReportsResponse.data.items.forEach((report) => {
          expect(report).to.be.an.instanceof(Report);
        });
      }
    });
  });

  describe('asReportDataType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asReportDataType).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asReportDataType).to.be.a('function');
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asReportDataType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<ReportData>', function () {
      const mockResponseData = {
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
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const reportData = apiResponse.asReportDataType();

      expect(reportData).to.be.an.instanceof(ApiResponse<ReportData>);
      expect(reportData.data).to.be.an.instanceof(ReportData);
      expect(reportData.data).to.have.property('columns').that.is.an('array');
      expect(reportData.data).to.have.property('rows').that.is.an('array');
      expect(reportData.data).to.not.be.null;

      if (reportData.data != null) {
        expect(reportData.data.columns).to.have.lengthOf(2);
        reportData.data.columns.forEach((column) => {
          expect(column).to.be.a('string');
        });
        expect(reportData.data.rows).to.have.lengthOf(2);
        reportData.data.rows.forEach((row) => {
          expect(row).to.be.an.instanceOf(Row);
        });
      }
    });
  });

  describe('asRecordType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asRecordType).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asRecordType).to.be.a('function');
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asRecordType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<Record>', function () {
      testFieldData.forEach((recordValue) => {
        const mockResponseData = {
          appId: 1,
          recordId: 1,
          fieldData: [recordValue],
        };

        const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
        const record = apiResponse.asRecordType();

        expect(record).to.be.an.instanceof(ApiResponse<Record>);
        expect(record.data).to.be.an.instanceof(Record);
        expect(record.data).to.have.property('appId', 1);
        expect(record.data).to.have.property('recordId', 1);
        expect(record.data).to.have.property('fieldData').that.is.an('array');
        expect(record.data).to.not.be.null;

        if (record.data != null) {
          record.data.fieldData.forEach((recordValue) => {
            expect(recordValue).to.be.an.instanceof(RecordValue);
            expect(recordValue).to.have.property('type');
            expect(recordValue).to.have.property('fieldId');
            expect(recordValue).to.have.property('value');
          });
        }
      });
    });

    it('should throw an error if a record value contains an unknown type', function () {
      const mockResponseData = {
        appId: 1,
        recordId: 1,
        fieldData: [
          {
            type: 'Unknown',
            fieldId: 1,
            value: 'value',
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordType();
      }).to.throw();
    });

    it('should throw an error if a record value for a survey delegate field contains an unknown delegate type', function () {
      const mockResponseData = {
        appId: 1,
        recordId: 1,
        fieldData: [
          {
            type: 'ScoringGroupList',
            fieldId: 12167,
            value: [
              {
                delegateType: 'Unknown',
                name: 'test_delegate',
                emailAddress: 'test@test.com',
                delegationType: 'AllPages',
                pageIds: [],
                answeredPageIds: [],
                canReadOtherPages: false,
                delegationDateTime: '2023-01-17T05:52:53.781Z',
                delegationCompletedDateTime: '2023-01-17T05:53:12.617Z',
                status: 'Pending',
                isDeleted: false,
                messagingDisplayText:
                  'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
                guid: '00000000-0000-0000-0000-000000000000',
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordType();
      }).to.throw();
    });

    it('should throw an error if record value for an attachment field contains an unknown file storage site type', function () {
      const mockResponseData = {
        appId: 1,
        recordId: 1,
        fieldData: [
          {
            type: 'AttachmentList',
            fieldId: 12888,
            value: [
              {
                fileId: 1348,
                fileName: 'onspring-api-playground.py',
                notes: '',
                storageLocation: 'Unknown',
              },
              {
                fileId: 1349,
                fileName: 'core_isolation_warning.png',
                notes: '',
                storageLocation: 'Internal',
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown increment type', function () {
      const mockResponseData = {
        appId: 1,
        recordId: 1,
        fieldData: [
          {
            type: 'TimeSpan',
            fieldId: 12893,
            value: {
              quantity: 10,
              increment: 'Unknown',
              recurrence: 'EndByDate',
              endByDate: '2023-02-16T06:00:00Z',
            },
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown recurrence type', function () {
      const mockResponseData = {
        appId: 1,
        recordId: 1,
        fieldData: [
          {
            type: 'TimeSpan',
            fieldId: 12893,
            value: {
              quantity: 10,
              increment: 'Days',
              recurrence: 'Unknown',
              endByDate: '2023-02-16T06:00:00Z',
            },
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordType();
      }).to.throw();
    });
  });

  describe('asGetPagedRecordsResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asGetPagedRecordsResponseType).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asGetPagedRecordsResponseType).to.be.a(
        'function'
      );
    });

    it('should have no parameters', function () {
      expect(
        ApiResponse.prototype.asGetPagedRecordsResponseType
      ).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<GetPagedRecordsResponse>', function () {
      const mockResponseData = {
        pageSize: 2,
        pageNumber: 1,
        totalRecords: 2,
        totalPages: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: testFieldData,
          },
          {
            appId: 2,
            recordId: 2,
            fieldData: testFieldData,
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const getPagedRecordsResponse =
        apiResponse.asGetPagedRecordsResponseType();

      expect(getPagedRecordsResponse).to.be.an.instanceof(
        ApiResponse<GetPagedRecordsResponse>
      );
      expect(getPagedRecordsResponse.data).to.be.an.instanceof(
        GetPagedRecordsResponse
      );
      expect(getPagedRecordsResponse.data).to.have.property('pageSize', 2);
      expect(getPagedRecordsResponse.data).to.have.property('pageNumber', 1);
      expect(getPagedRecordsResponse.data).to.have.property('totalRecords', 2);
      expect(getPagedRecordsResponse.data).to.have.property('totalPages', 1);

      expect(getPagedRecordsResponse.data)
        .to.have.property('items')
        .to.be.an('array')
        .that.has.lengthOf(2);

      expect(getPagedRecordsResponse.data).to.not.be.null;

      if (getPagedRecordsResponse.data != null) {
        getPagedRecordsResponse.data.items.forEach((record) => {
          expect(record).to.be.an.instanceof(Record);

          expect(record).to.have.property('appId');
          expect(record).to.have.property('recordId');
          expect(record).to.have.property('fieldData').that.is.an('array');
          expect(record).to.not.be.null;

          if (record != null) {
            record.fieldData.forEach((recordValue) => {
              expect(recordValue).to.be.an.instanceof(RecordValue);
              expect(recordValue).to.have.property('type');
              expect(recordValue).to.have.property('fieldId');
              expect(recordValue).to.have.property('value');
            });
          }
        });
      }
    });

    it('should throw an error if a record value contains an unknown type', function () {
      const mockResponseData = {
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
                type: 'Unknown',
                fieldId: 1,
                value: 'value',
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asGetPagedRecordsResponseType();
      }).to.throw();
    });

    it('should throw an error if a record value for a survey delegate field contains an unknown delegate type', function () {
      const mockResponseData = {
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
                type: 'ScoringGroupList',
                fieldId: 12167,
                value: [
                  {
                    delegateType: 'Unknown',
                    name: 'test_delegate',
                    emailAddress: 'test@test.com',
                    delegationType: 'AllPages',
                    pageIds: [],
                    answeredPageIds: [],
                    canReadOtherPages: false,
                    delegationDateTime: '2023-01-17T05:52:53.781Z',
                    delegationCompletedDateTime: '2023-01-17T05:53:12.617Z',
                    status: 'Pending',
                    isDeleted: false,
                    messagingDisplayText:
                      'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
                    guid: '00000000-0000-0000-0000-000000000000',
                  },
                ],
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asGetPagedRecordsResponseType();
      }).to.throw();
    });

    it('should throw an error if record value for an attachment field contains an unknown file storage site type', function () {
      const mockResponseData = {
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
                type: 'AttachmentList',
                fieldId: 12888,
                value: [
                  {
                    fileId: 1348,
                    fileName: 'onspring-api-playground.py',
                    notes: '',
                    storageLocation: 'Unknown',
                  },
                  {
                    fileId: 1349,
                    fileName: 'core_isolation_warning.png',
                    notes: '',
                    storageLocation: 'Internal',
                  },
                ],
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asGetPagedRecordsResponseType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown increment type', function () {
      const mockResponseData = {
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
                type: 'TimeSpan',
                fieldId: 12893,
                value: {
                  quantity: 10,
                  increment: 'Unknown',
                  recurrence: 'EndByDate',
                  endByDate: '2023-02-16T06:00:00Z',
                },
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asGetPagedRecordsResponseType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown recurrence type', function () {
      const mockResponseData = {
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
                type: 'TimeSpan',
                fieldId: 12893,
                value: {
                  quantity: 10,
                  increment: 'Days',
                  recurrence: 'Unknown',
                  endByDate: '2023-02-16T06:00:00Z',
                },
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asGetPagedRecordsResponseType();
      }).to.throw();
    });
  });

  describe('asRecordCollectionType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asRecordCollectionType).to.not.be.undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asRecordCollectionType).to.be.a('function');
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.asRecordCollectionType).to.have.lengthOf(0);
    });

    it('should return an ApiResponse<CollectionResponse<Record>>', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: testFieldData,
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const recordCollection = apiResponse.asRecordCollectionType();

      expect(recordCollection).to.be.an.instanceof(
        ApiResponse<CollectionResponse<Record>>
      );
      expect(recordCollection.data).to.be.an.instanceof(
        CollectionResponse<Record>
      );
      expect(recordCollection.data).to.have.property('count', 1);
      expect(recordCollection.data)
        .to.have.property('items')
        .to.be.an('array')
        .that.has.lengthOf(1);

      expect(recordCollection.data).to.not.be.null;

      if (recordCollection.data != null) {
        recordCollection.data.items.forEach((record) => {
          expect(record).to.be.an.instanceof(Record);
          expect(record).to.have.property('appId', 1);
          expect(record).to.have.property('recordId', 1);
          expect(record).to.have.property('fieldData').that.is.an('array');
          expect(record).to.not.be.null;

          if (record != null) {
            record.fieldData.forEach((recordValue) => {
              expect(recordValue).to.be.an.instanceof(RecordValue);
              expect(recordValue).to.have.property('type');
              expect(recordValue).to.have.property('fieldId');
              expect(recordValue).to.have.property('value');
            });
          }
        });
      }
    });

    it('should throw an error if a record value contains an unknown type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'Unknown',
                fieldId: 1,
                value: 'value',
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordCollectionType();
      }).to.throw();
    });

    it('should throw an error if a record value for a survey delegate field contains an unknown delegate type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'ScoringGroupList',
                fieldId: 12167,
                value: [
                  {
                    delegateType: 'Unknown',
                    name: 'test_delegate',
                    emailAddress: 'test@test.com',
                    delegationType: 'AllPages',
                    pageIds: [],
                    answeredPageIds: [],
                    canReadOtherPages: false,
                    delegationDateTime: '2023-01-17T05:52:53.781Z',
                    delegationCompletedDateTime: '2023-01-17T05:53:12.617Z',
                    status: 'Pending',
                    isDeleted: false,
                    messagingDisplayText:
                      'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
                    guid: '00000000-0000-0000-0000-000000000000',
                  },
                ],
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordCollectionType();
      }).to.throw();
    });

    it('should throw an error if record value for an attachment field contains an unknown file storage site type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'AttachmentList',
                fieldId: 12888,
                value: [
                  {
                    fileId: 1348,
                    fileName: 'onspring-api-playground.py',
                    notes: '',
                    storageLocation: 'Unknown',
                  },
                  {
                    fileId: 1349,
                    fileName: 'core_isolation_warning.png',
                    notes: '',
                    storageLocation: 'Internal',
                  },
                ],
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordCollectionType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown increment type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'TimeSpan',
                fieldId: 12893,
                value: {
                  quantity: 10,
                  increment: 'Unknown',
                  recurrence: 'EndByDate',
                  endByDate: '2023-02-16T06:00:00Z',
                },
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordCollectionType();
      }).to.throw();
    });

    it('should throw an error if record value for a timespan field contains an unknown recurrence type', function () {
      const mockResponseData = {
        count: 1,
        items: [
          {
            appId: 1,
            recordId: 1,
            fieldData: [
              {
                type: 'TimeSpan',
                fieldId: 12893,
                value: {
                  quantity: 10,
                  increment: 'Days',
                  recurrence: 'Unknown',
                  endByDate: '2023-02-16T06:00:00Z',
                },
              },
            ],
          },
        ],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);

      expect(() => {
        apiResponse.asRecordCollectionType();
      }).to.throw();
    });
  });

  describe('asSaveRecordResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.asSaveRecordResponseType).to.not.be
        .undefined;
    });

    it('should be a function', function () {
      expect(ApiResponse.prototype.asSaveRecordResponseType).to.be.a(
        'function'
      );
    });

    it('should take no parameters', function () {
      expect(ApiResponse.prototype.asSaveRecordResponseType).to.have.lengthOf(
        0
      );
    });

    it('should return a SaveRecordResponse', function () {
      const mockResponseData = {
        id: 1,
        warnings: ['warning 1', 'warning 2'],
      };

      const apiResponse = new ApiResponse(200, 'OK', mockResponseData);
      const saveRecordResponse = apiResponse.asSaveRecordResponseType();

      expect(saveRecordResponse).to.be.an.instanceof(
        ApiResponse<SaveRecordResponse>
      );
      expect(saveRecordResponse.data).to.be.an.instanceof(SaveRecordResponse);
      expect(saveRecordResponse.data).to.have.property('id', 1);
      expect(saveRecordResponse.data)
        .to.have.property('warnings')
        .that.is.an('array')
        .that.has.lengthOf(2);
    });
  });
});
