import { expect } from 'chai';
import { FieldStatus } from '../src/enums/FieldStatus';
import { FieldType } from '../src/enums/FieldType';
import { Field } from '../src/models/Field';

describe('Field', function () {
  it('should be defined', function () {
    expect(Field).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Field).to.have.property('constructor');
  });

  it('should have 7 parameters', function () {
    expect(Field).to.have.lengthOf(7);
  });

  it('should create a new instance of the Field class', function () {
    expect(
      () =>
        new Field(
          1,
          1,
          'Text Field',
          FieldType.Text,
          FieldStatus.Enabled,
          true,
          false
        )
    ).to.not.throw();
  });

  it('should create a new instance of the Field class with the correct properties and values', function () {
    const field = new Field(
      1,
      1,
      'Text Field',
      FieldType.Text,
      FieldStatus.Enabled,
      true,
      false
    );

    expect(field).to.have.property('id', 1);
    expect(field).to.have.property('appId', 1);
    expect(field).to.have.property('name', 'Text Field');
    expect(field).to.have.property('type', FieldType.Text);
    expect(field).to.have.property('status', FieldStatus.Enabled);
    expect(field).to.have.property('isRequired', true);
    expect(field).to.have.property('isUnique', false);
  });
});
