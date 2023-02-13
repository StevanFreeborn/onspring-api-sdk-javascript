import { FileListRecordValue } from '../src/models/FileListRecordValue';
import { expect } from 'chai';

describe('FileListRecordValue', function () {
  it('should be defined', function () {
    expect(FileListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(FileListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(FileListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const fileListRecordValue = new FileListRecordValue(1, []);
    expect(fileListRecordValue).to.have.property('fieldId');
    expect(fileListRecordValue).to.have.property('value');
    expect(fileListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const fileListRecordValue = new FileListRecordValue(1, []);
    expect(fileListRecordValue.fieldId).to.equal(1);
    expect(fileListRecordValue.value).to.deep.equal([]);
    expect(fileListRecordValue.type).to.equal('FileList');
  });
});
