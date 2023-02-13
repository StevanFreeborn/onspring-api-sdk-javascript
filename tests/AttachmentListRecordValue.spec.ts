import { AttachmentListRecordValue } from '../src/models/AttachmentListRecordValue';
import { expect } from 'chai';

describe('AttachmentListRecordValue', function () {
  it('should be defined', function () {
    expect(AttachmentListRecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(AttachmentListRecordValue).to.have.property('constructor');
  });

  it('should hav a constructor that takes a fieldId and value', function () {
    expect(AttachmentListRecordValue).to.have.lengthOf(2);
  });

  it('should have fieldId, value, and type properties', function () {
    const attachmentListRecordValue = new AttachmentListRecordValue(1, []);
    expect(attachmentListRecordValue).to.have.property('fieldId');
    expect(attachmentListRecordValue).to.have.property('value');
    expect(attachmentListRecordValue).to.have.property('type');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const attachmentListRecordValue = new AttachmentListRecordValue(1, []);
    expect(attachmentListRecordValue.fieldId).to.equal(1);
    expect(attachmentListRecordValue.value).to.deep.equal([]);
    expect(attachmentListRecordValue.type).to.equal('AttachmentList');
  });
});
