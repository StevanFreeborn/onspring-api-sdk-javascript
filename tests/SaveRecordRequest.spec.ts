import { SaveRecordRequest } from '../src/models/SaveRecordRequest';
import { expect } from 'chai';

describe('SaveRecordRequest', function () {
  it('should be defined', function () {
    expect(SaveRecordRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(SaveRecordRequest).to.have.property('constructor');
  });

  it('should have a constructor that takes 1 parameter', function () {
    expect(SaveRecordRequest.constructor).to.have.lengthOf(1);
  });

  it('should have an appId property', function () {
    expect(new SaveRecordRequest(1)).to.have.property('appId');
  });

  it('should have a recordId property', function () {
    expect(new SaveRecordRequest(1)).to.have.property('recordId');
  });

  it('should have a fields property', function () {
    expect(new SaveRecordRequest(1)).to.have.property('fields');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const saveRecordRequest = new SaveRecordRequest(1);
    expect(saveRecordRequest.appId).to.equal(1);
    expect(saveRecordRequest.recordId).to.be.null;
    expect(saveRecordRequest.fields).to.not.be.null.and.not.be.undefined;
    expect(saveRecordRequest.fields).to.have.lengthOf(0);
  });

  it('should have a constructor that sets its properties correctly when passed a recordId', function () {
    const saveRecordRequest = new SaveRecordRequest(1, 2);
    expect(saveRecordRequest.appId).to.equal(1);
    expect(saveRecordRequest.recordId).to.equal(2);
    expect(saveRecordRequest.fields).to.not.be.null.and.not.be.undefined;
    expect(saveRecordRequest.fields).to.have.lengthOf(0);
  });

  it('should have a constructor that sets its properties correctly when passed a recordId and fields', function () {
    const map = new Map([
      [1, 'test'],
      [2, 'test'],
    ]);
    const saveRecordRequest = new SaveRecordRequest(1, 2, map);
    expect(saveRecordRequest).to.have.property('appId', 1);
    expect(saveRecordRequest).to.have.property('recordId', 2);
    expect(saveRecordRequest).to.have.property('fields', map);
    expect(saveRecordRequest.fields).to.not.be.null.and.not.be.undefined;
    expect(saveRecordRequest.fields).to.have.lengthOf(2);
  });
});
