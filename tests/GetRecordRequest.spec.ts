import { GetRecordRequest } from '../src/models/GetRecordRequest';
import { expect } from 'chai';
import { DataFormat } from '../src/enums/DataFormat';

describe('GetRecordRequest', function () {
  it('should be defined', function () {
    expect(GetRecordRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetRecordRequest).to.have.property('constructor');
  });

  it('should have a constructor that takes 2 parameter', function () {
    expect(GetRecordRequest).to.have.lengthOf(2);
  });

  it('should have a appId property', function () {
    expect(new GetRecordRequest(1, 1, [1, 2], DataFormat.Raw)).to.have.property(
      'appId'
    );
  });

  it('should have a recordId property', function () {
    expect(new GetRecordRequest(1, 1, [1, 2], DataFormat.Raw)).to.have.property(
      'recordId'
    );
  });

  it('should have a fieldIds property', function () {
    expect(new GetRecordRequest(1, 1, [1, 2], DataFormat.Raw)).to.have.property(
      'fieldIds'
    );
  });

  it('should have a dataFormat property', function () {
    expect(new GetRecordRequest(1, 1, [1, 2], DataFormat.Raw)).to.have.property(
      'dataFormat'
    );
  });

  it('should have a constructor that sets its properties correctly', function () {
    const appId = 1;
    const recordId = 1;
    const fieldIds = [1, 2];
    const dataFormat = DataFormat.Raw;

    const request = new GetRecordRequest(appId, recordId, fieldIds, dataFormat);

    expect(request).to.have.property('appId', appId);
    expect(request).to.have.property('recordId', recordId);
    expect(request).to.have.property('fieldIds', fieldIds);
    expect(request).to.have.property('dataFormat', dataFormat);
  });
});
