import { GetRecordsRequest } from '../src/models/GetRecordsRequest';
import { expect } from 'chai';
import { DataFormat } from '../src/enums/DataFormat';

describe('GetRecordsRequest', function () {
  it('should be defined', function () {
    expect(GetRecordsRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetRecordsRequest).to.have.property('constructor');
  });

  it('should have a constructor with 2 parameters', function () {
    expect(GetRecordsRequest).to.have.lengthOf(2);
  });

  it('should have an appId property', function () {
    expect(new GetRecordsRequest(1, [1, 2])).to.have.property('appId');
  });

  it('should have a recordIds property', function () {
    expect(new GetRecordsRequest(1, [1, 2])).to.have.property('recordIds');
  });

  it('should have a fieldIds property', function () {
    expect(new GetRecordsRequest(1, [1, 2])).to.have.property('fieldIds');
  });

  it('should have a dataFormat property', function () {
    expect(new GetRecordsRequest(1, [1, 2])).to.have.property('dataFormat');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const appId = 1;
    const recordIds = [1, 2];
    const fieldIds = [1, 2];
    const dataFormat = DataFormat.Raw;

    const request = new GetRecordsRequest(
      appId,
      recordIds,
      fieldIds,
      dataFormat
    );
    expect(request).to.have.property('appId', appId);
    expect(request).to.have.property('recordIds', recordIds);
    expect(request).to.have.property('fieldIds', fieldIds);
    expect(request).to.have.property('dataFormat', dataFormat);
  });
});
