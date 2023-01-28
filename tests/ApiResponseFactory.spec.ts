import { ApiResponseFactory } from '../src/models/ApiResponseFactory';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { expect } from 'chai';

describe('ApiResponseFactory', function () {
  it('should be defined', function () {
    expect(ApiResponseFactory).to.not.be.undefined;
  });

  describe('getApiResponse', function () {
    it('should be defined', function () {
      expect(ApiResponseFactory.getApiResponse).to.not.be.undefined;
    });

    it('should have 1 parameter', function () {
      expect(ApiResponseFactory.getApiResponse).to.have.lengthOf(1);
    });

    it('should return an ApiResponse object', function () {
      const response: AxiosResponse = {
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(200);
      expect(apiResponse.message).to.equal('');
      expect(apiResponse.data).to.equal(null);
    });
  });
});