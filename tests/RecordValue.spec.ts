import { RecordValue } from '../src/models/RecordValue';
import { expect } from 'chai';
import { RecordValueType } from '../src/enums/RecordValueType';

describe('RecordValue', function () {
  it('should be defined', function () {
    expect(RecordValue).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(RecordValue).to.have.property('constructor');
  });

  it('should have a constructor that has 3 parameters', function () {
    expect(RecordValue).to.have.lengthOf(3);
  });

  it('should have a constructor that sets its properties correctly', function () {
    const recordValue = new RecordValue(
      RecordValueType.Date,
      2,
      new Date().toUTCString()
    );
    expect(recordValue).to.have.property('type', RecordValueType.Date);
    expect(recordValue).to.have.property('fieldId', 2);
    expect(recordValue).to.have.property('value', new Date().toUTCString());
  });

  it('should have a type property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('type');
  });

  it('should have a fieldId property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('fieldId');
  });

  it('should have a value property', function () {
    expect(
      new RecordValue(RecordValueType.Date, 2, new Date().toUTCString())
    ).to.have.property('value');
  });
});
