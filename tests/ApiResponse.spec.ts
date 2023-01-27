import { ApiResponse } from '../src/models/ApiResponse';
import { expect } from 'chai';

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
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property('statusCode');
  });

  it('should have a property named isSuccessful', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property('isSuccessful');
  });

  it('should have a property named message', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property('message');
  });

  it('should have a property named data', function () {
    expect(new ApiResponse(200, 'a message', 'some data')).to.have.property('data');
  });

  it('should set the statusCode property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').statusCode).to.equal(200);
  });

  it('should set the isSuccessful property to true when the statusCode is less than 400', function () {
    expect(new ApiResponse(200, 'a message', 'some data').isSuccessful).to.be.true;
  });

  it('should set the isSuccessful property to false when the statusCode is greater than or equal to 400', function () {
    expect(new ApiResponse(400, 'a message', 'some data').isSuccessful).to.be.false;
  });

  it('should set the message property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').message).to.equal('a message');
  });

  it('should set the data property to the value passed to the constructor', function () {
    expect(new ApiResponse(200, 'a message', 'some data').data).to.equal('some data');
  });
});