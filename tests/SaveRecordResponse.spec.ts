import { SaveRecordResponse } from '../src/models/SaveRecordResponse';
import { expect } from 'chai';

describe('SaveRecordResponse', function () {
  it('should be defined', function () {
    expect(SaveRecordResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(SaveRecordResponse).to.have.property('constructor');
  });

  it('should have 1 parameter', function () {
    expect(SaveRecordResponse).to.have.lengthOf(1);
  });

  it('should have a id property', function () {
    expect(new SaveRecordResponse(1)).to.have.property('id');
  });

  it('should have a warnings property', function () {
    expect(new SaveRecordResponse(1)).to.have.property('warnings');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const response = new SaveRecordResponse(1);
    expect(response.id).to.equal(1);
    expect(response.warnings).to.be.an('array').that.has.lengthOf(0);
  });

  it('should have a constructor that sets its properties correctly when passed warnings', function () {
    const response = new SaveRecordResponse(1, ['warning1', 'warning2']);
    expect(response.id).to.equal(1);
    expect(response.warnings).to.be.an('array').that.has.lengthOf(2);
  });
});
