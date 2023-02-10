import { GetPagedFieldsResponse } from '../src/models/GetPagedFieldsResponse';
import { Field } from '../src/models/Field';
import { expect } from 'chai';
import { FieldType } from '../src/enums/FieldType';
import { FieldStatus } from '../src/enums/FieldStatus';

describe('GetPagedFieldsResponse', function () {
  it('should be defined', function () {
    expect(GetPagedFieldsResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(GetPagedFieldsResponse).to.have.property('constructor');
  });

  it('should have 5 parameters', function () {
    expect(GetPagedFieldsResponse).to.have.lengthOf(5);
  });

  it('should construct a new instance of GetPagedFieldsResponse', function () {
    const getPagedFieldsResponse = new GetPagedFieldsResponse(
      [
        new Field(
          1,
          1,
          'Text Field 1',
          FieldType.Text,
          FieldStatus.Enabled,
          false,
          false
        ),
      ],
      1,
      10,
      100,
      100
    );

    expect(getPagedFieldsResponse).to.not.be.undefined;
    expect(getPagedFieldsResponse).to.be.instanceOf(GetPagedFieldsResponse);
    expect(getPagedFieldsResponse)
      .to.have.property('items')
      .to.be.an('array')
      .to.have.lengthOf(1);
    expect(getPagedFieldsResponse)
      .to.have.property('pageNumber')
      .to.be.a('number')
      .to.equal(1);
    expect(getPagedFieldsResponse)
      .to.have.property('pageSize')
      .to.be.a('number')
      .to.equal(10);
    expect(getPagedFieldsResponse)
      .to.have.property('totalPages')
      .to.be.a('number')
      .to.equal(100);
    expect(getPagedFieldsResponse)
      .to.have.property('totalRecords')
      .to.be.a('number')
      .to.equal(100);
  });
});
