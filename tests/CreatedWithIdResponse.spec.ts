import { expect } from 'chai';
import { CreatedWithIdResponse } from '../src/models/CreatedWithIdResponse';

describe('CreatedWithIdResponse', function () {
  it('should be defined', function () {
    expect(CreatedWithIdResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(CreatedWithIdResponse).to.have.property('constructor');
  });

  it('should have 1 parameters', function () {
    expect(CreatedWithIdResponse).to.have.lengthOf(1);
  });

  it('should create a new instance of the CreatedWithIdResponse class', function () {
    expect(() => new CreatedWithIdResponse(1)).to.not.throw();
  });

  it('should have a property named id', function () {
    expect(new CreatedWithIdResponse(1)).to.have.property('id');
  });

  it('should set the id property to the value passed to the constructor', function () {
    expect(new CreatedWithIdResponse(1).id).to.equal(1);
  });
});
