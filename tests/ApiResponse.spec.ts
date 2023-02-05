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
      if (appsPagedResponse.data != null) {
        expect(appsPagedResponse.data.totalPages).to.equal(1);
        expect(appsPagedResponse.data.totalRecords).to.equal(2);
        expect(appsPagedResponse.data.pageNumber).to.equal(1);
        expect(appsPagedResponse.data.pageSize).to.equal(2);
        expect(appsPagedResponse.data.items).to.be.instanceOf(Array);
        expect(appsPagedResponse.data.items).to.have.lengthOf(2);
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
      if (appsPagedResponse.data != null) {
        expect(appsPagedResponse.data.totalPages).to.equal(0);
        expect(appsPagedResponse.data.totalRecords).to.equal(0);
        expect(appsPagedResponse.data.pageNumber).to.equal(0);
        expect(appsPagedResponse.data.pageSize).to.equal(0);
        expect(appsPagedResponse.data.items).to.be.instanceOf(Array);
        expect(appsPagedResponse.data.items).to.have.lengthOf(0);
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
      if (appResponse.data != null) {
        expect(appResponse.data.id).to.equal(1);
        expect(appResponse.data.name).to.equal('Test App');
        expect(appResponse.data.href).to.equal(
          'https://api.onspring.dev/apps/id/1'
        );
      }
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
      if (appCollectionResponse.data != null) {
        expect(appCollectionResponse.data).to.have.property('count');
        expect(appCollectionResponse.data).to.have.property('items');
        expect(appCollectionResponse.data.count).to.equal(2);
        expect(appCollectionResponse.data.items).to.be.instanceOf(Array);
        expect(appCollectionResponse.data.items).to.have.lengthOf(2);
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
      if (fieldResponse.data != null) {
        expect(fieldResponse.data.id).to.equal(1);
        expect(fieldResponse.data.appId).to.equal(1);
        expect(fieldResponse.data.name).to.equal('Text Field');
        expect(fieldResponse.data.type).to.equal(FieldType.Text);
        expect(fieldResponse.data.status).to.equal(FieldStatus.Enabled);
        expect(fieldResponse.data.isRequired).to.equal(false);
        expect(fieldResponse.data.isUnique).to.equal(false);
      }
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
      if (fieldResponse.data != null) {
        const listField = fieldResponse.data as ListField;
        expect(listField.id).to.equal(11929);
        expect(listField.appId).to.equal(373);
        expect(listField.name).to.equal('single-select list field');
        expect(listField.type).to.equal(FieldType.List);
        expect(listField.status).to.equal(FieldStatus.Enabled);
        expect(listField.isRequired).to.equal(false);
        expect(listField.isUnique).to.equal(false);
        expect(listField.multiplicity).to.equal(Multiplicity.SingleSelect);
        expect(listField.listId).to.equal(1581);
        expect(listField.values).to.be.instanceOf(Array);
        expect(listField.values).to.have.lengthOf(3);
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
      if (fieldResponse.data != null) {
        const referenceField = fieldResponse.data as ReferenceField;
        expect(referenceField.id).to.equal(11866);
        expect(referenceField.appId).to.equal(373);
        expect(referenceField.name).to.equal('Created By');
        expect(referenceField.type).to.equal(FieldType.Reference);
        expect(referenceField.status).to.equal(FieldStatus.Enabled);
        expect(referenceField.isRequired).to.equal(false);
        expect(referenceField.isUnique).to.equal(false);
        expect(referenceField.multiplicity).to.equal(Multiplicity.SingleSelect);
        expect(referenceField.referencedAppId).to.equal(2);
      }
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
      if (fieldResponse.data != null) {
        const formulaField = fieldResponse.data as FormulaField;
        expect(formulaField.id).to.equal(12680);
        expect(formulaField.appId).to.equal(373);
        expect(formulaField.name).to.equal('List Formula Field');
        expect(formulaField.type).to.equal(FieldType.Formula);
        expect(formulaField.status).to.equal(FieldStatus.Enabled);
        expect(formulaField.isRequired).to.equal(false);
        expect(formulaField.isUnique).to.equal(false);
        expect(formulaField.outputType).to.equal(FormulaOutputType.ListValue);
        expect(formulaField.values).to.be.instanceOf(Array);
        expect(formulaField.values).to.have.lengthOf(2);
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
      if (fieldResponse.data != null) {
        const formulaField = fieldResponse.data as FormulaField;
        expect(formulaField.id).to.equal(12060);
        expect(formulaField.appId).to.equal(373);
        expect(formulaField.name).to.equal('GetWeekOfYear');
        expect(formulaField.type).to.equal(FieldType.Formula);
        expect(formulaField.status).to.equal(FieldStatus.Enabled);
        expect(formulaField.isRequired).to.equal(false);
        expect(formulaField.isUnique).to.equal(false);
        expect(formulaField.outputType).to.equal(FormulaOutputType.Text);
        expect(formulaField.values).to.be.instanceOf(Array);
        expect(formulaField.values).to.have.lengthOf(0);
      }
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
      if (fieldCollectionResponse.data != null) {
        expect(fieldCollectionResponse.data.items).to.be.instanceOf(Array);
        expect(fieldCollectionResponse.data.items).to.have.lengthOf(2);
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

      if (getPagedFieldsResponse.data != null) {
        expect(getPagedFieldsResponse.data.pageNumber).to.equal(1);
        expect(getPagedFieldsResponse.data.pageSize).to.equal(2);
        expect(getPagedFieldsResponse.data.totalPages).to.equal(1);
        expect(getPagedFieldsResponse.data.totalRecords).to.equal(2);
        expect(getPagedFieldsResponse.data.items).to.be.instanceOf(Array);
        expect(getPagedFieldsResponse.data.items).to.have.lengthOf(2);
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

      if (getPagedFieldsResponse.data != null) {
        expect(getPagedFieldsResponse.data.pageNumber).to.equal(0);
        expect(getPagedFieldsResponse.data.pageSize).to.equal(0);
        expect(getPagedFieldsResponse.data.totalPages).to.equal(0);
        expect(getPagedFieldsResponse.data.totalRecords).to.equal(0);
        expect(getPagedFieldsResponse.data.items).to.be.instanceOf(Array);
        expect(getPagedFieldsResponse.data.items).to.have.lengthOf(0);
      }
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
      if (createdWithIdResponse.data != null) {
        expect(createdWithIdResponse.data.id).to.equal(1);
      }
    });
  });
});
