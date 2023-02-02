import { ApiResponse } from '../src/models/ApiResponse';
import { expect } from 'chai';
import { GetPagedAppsResponse } from '../src/models/GetPagedAppsResponse';
import { App } from '../src/models/App';

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

  describe('AsGetPagedAppsResponseType', function () {
    it('should be defined', function () {
      expect(ApiResponse.prototype.AsGetPagedAppsResponseType).to.not.be
        .undefined;
    });

    it('should have no parameters', function () {
      expect(ApiResponse.prototype.AsGetPagedAppsResponseType).to.have.lengthOf(
        0
      );
    });

    it('should return an ApiResponse<GetPagedAppsResponse>', function () {
      var mockApiResponse = {
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

      var apiResponse = new ApiResponse<any>(200, 'OK', mockApiResponse);
      var appsPagedResponse = apiResponse.AsGetPagedAppsResponseType();

      expect(appsPagedResponse).to.be.instanceOf(ApiResponse);
      expect(appsPagedResponse.data).to.be.instanceOf(GetPagedAppsResponse);
      expect(appsPagedResponse.data.totalPages).to.equal(1);
      expect(appsPagedResponse.data.totalRecords).to.equal(2);
      expect(appsPagedResponse.data.pageNumber).to.equal(1);
      expect(appsPagedResponse.data.pageSize).to.equal(2);
      expect(appsPagedResponse.data.items).to.be.instanceOf(Array);
      expect(appsPagedResponse.data.items).to.have.lengthOf(2);
      expect(appsPagedResponse.data.items[0]).to.be.instanceOf(App);
      expect(appsPagedResponse.data.items[1]).to.be.instanceOf(App);
    });
  });
});
