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

    it('should return an ApiResponse object when request is successful', function () {
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

    it('should return an ApiResponse object without a message value when request is forbidden and the response does not contain a message property', function () {
      const response: AxiosResponse = {
        data: null,
        status: 403,
        statusText: 'Forbidden',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(403);
      expect(apiResponse.message).to.equal(undefined);
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object when request is forbidden and the response contains a message property', function () {
      const response: AxiosResponse = {
        data: {
          message: 'Does not have permission to access this resource.',
        },
        status: 403,
        statusText: 'Forbidden',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(403);
      expect(apiResponse.message).to.equal(
        'Does not have permission to access this resource.'
      );
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object without a message value when request is not found and the response does not contain a message property', function () {
      const response: AxiosResponse = {
        data: null,
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(404);
      expect(apiResponse.message).to.equal(undefined);
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object with a message value when request is not found and the response contains a message property', function () {
      const response: AxiosResponse = {
        data: {
          message: 'Resource not found.',
        },
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(404);
      expect(apiResponse.message).to.equal('Resource not found.');
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object without a message value when request is unauthorized and the response does not contain a message property', function () {
      const response: AxiosResponse = {
        data: null,
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(401);
      expect(apiResponse.message).to.equal(undefined);
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object with a message when request is unauthorized and the response contains a message property', function () {
      const response: AxiosResponse = {
        data: {
          message: 'Unauthorized.',
        },
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(401);
      expect(apiResponse.message).to.equal('Unauthorized.');
      expect(apiResponse.data).to.equal(null);
    });

    it('should return an ApiResponse object with a message when request is a bad request', function () {
      const response: AxiosResponse = {
        data: {
          field: 'Invalid input.',
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const apiResponse = ApiResponseFactory.getApiResponse(response);

      expect(apiResponse).to.not.be.undefined;
      expect(apiResponse).to.have.property('statusCode');
      expect(apiResponse).to.have.property('message');
      expect(apiResponse).to.have.property('data');
      expect(apiResponse.statusCode).to.equal(400);
      expect(apiResponse.message).to.equal('{"field":"Invalid input."}');
      expect(apiResponse.data).to.equal(null);
    });
  });
});
